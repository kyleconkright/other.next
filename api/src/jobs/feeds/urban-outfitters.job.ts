import { PuppeteerClient } from './../../controllers/puppeteer';
const cheerio = require('cheerio');
import * as cron from 'node-cron';

import FeedItem from './../../schemas/feedItem';

const puppeteer = new PuppeteerClient();
const type = 'uo-listing'

export class UrbanOutfittersJob {
	public async execute() {
		await this.getListings();
		cron.schedule("0 0 */1 * * *", async () => {
      try {
        await this.getListings();
      } catch (error) {
        console.error(error);
        return ({ message: 'Something went wrong: Urban Outfitters' })
      }
    })
	}

	async getListings() {
		let result;
		try {	
			result = await puppeteer.scrape('https://www.urbanoutfitters.com/vinyl-records', '.c-pwa-tile-grid-inner');
			await FeedItem.deleteMany({ type });
			if (result) {
				result.map(async item => {
					const $ = cheerio.load(item);
					const price = parseFloat($('.c-pwa-product-price__current').text().trim().replace('$', ''));
					const listing = {
						title: $('.c-pwa-product-tile__heading').text().trim(),
						url: 'https://www.urbanoutfitters.com' + $('a').attr('href'),
						origin: 'https://www.urbanoutfitters.com' + $('a').attr('href'),
						flair: null,
						price: price ? price : 0,
						imageUrl: $('.c-pwa-product-tile__image-outer img').attr('src'),
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
		} catch(error) {
			console.error(error);
		}
	}
}