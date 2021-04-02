import { PuppeteerClient } from './../../controllers/puppeteer';
const cheerio = require('cheerio');
import * as cron from 'node-cron';

import FeedItem from './../../schemas/feedItem';

const puppeteer = new PuppeteerClient();
const type = 'newbury-exclusive'

export class NewburyJob {
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
		const result = await puppeteer.scrape('https://www.newburycomics.com/collections/exclusive-vinyl', '.grid__item.product-link');
		await FeedItem.deleteMany({ type });

		result.map(async item => {
			const $ = cheerio.load(item);
			const listing = {
				title: $('a').text().trim(),
				url: 'https://www.newburycomics.com' + $('a').attr('href'),
				origin: 'https://www.newburycomics.com' + $('a').attr('href'),
				flair: 'exclusive',
				price: parseFloat($('p').text().trim().replace('$', '')),
				imageUrl: 'http:' + $('img').attr('src'),
				createdUtc: null,
				type
			}

			try {
				await FeedItem.create(listing);
			} catch (error) {
				console.error(error);
				return error;
			}
		})
		
	}
}