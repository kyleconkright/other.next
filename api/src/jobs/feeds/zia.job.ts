import { PuppeteerClient } from './../../controllers/puppeteer';
const cheerio = require('cheerio');
import * as cron from 'node-cron';

import FeedItem from './../../schemas/feedItem';

const puppeteer = new PuppeteerClient();
const type = 'zia-listing'

export class ZiaJob {
	public async execute() {
		await this.getListings();
		cron.schedule("0 0 */1 * * *", async () => {
      try {
        await this.getListings();
      } catch (error) {
        console.error(error);
        return ({ message: 'Something went wrong: Ebay' })
      }
    })
	}

	async getListings() {
		const result = await puppeteer.scrape('https://www.ziarecords.com/c/11/vinyl', '.producttitlelink.product-grid-variant');
		await FeedItem.deleteMany({ type });

		result.map(async item => {
			// console.log(item);
			const $ = cheerio.load(item);
			const listing = {
				title: $('.product-title').text().trim() + ' - ' + $('.product-artist').text().trim(),
		// 		url: 'https://www.newburycomics.com' + $('a').attr('href'),
		// 		origin: 'https://www.newburycomics.com' + $('a').attr('href'),
		// 		flair: 'exclusive',
				price: parseFloat($('span.normal-price span').text().trim().replace('$', '')),
				imageUrl: 'http:' + $('img').data('src'),
		// 		createdUtc: null,
		// 		type
			}
			console.log(listing);

			// try {
			// 	await FeedItem.create(listing);
			// } catch (error) {
			// 	console.error(error);
			// 	return error;
			// }
		})
		
	}
}