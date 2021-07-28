import { PuppeteerClient } from '../../controllers/puppeteer';
const cheerio = require('cheerio');
import * as cron from 'node-cron';

import FeedItem from '../../schemas/feedItem';

const puppeteer = new PuppeteerClient();
const type = 'ttl-exclusive'

export class TurntableLabJob {
	public async execute() {
		await this.getListings();
		cron.schedule("0 0 */1 * * *", async () => {
      try {
        await this.getListings();
      } catch (error) {
        console.error(error);
        return ({ message: 'Something went wrong: TTL' })
      }
    })
	}

	async getListings() {
		const result = await puppeteer.scrape('https://www.turntablelab.com/collections/turntable-lab-exclusive-vinyl-pressings?_=pf&pf_st_stock_status=true', '.product-block');
		await FeedItem.deleteMany({ type });

		result.map(async item => {
			const $ = cheerio.load(item);
			const listing = {
				title: $('.title').text().trim(),
				url: 'https://www.turntablelab.com/' + $('a.title').attr('href'),
				origin: 'https://www.turntablelab.com/' + $('a.title').attr('href'),
				flair: 'exclusive',
				price: parseFloat($('.money').text().trim().replace('$', '')),
				imageUrl: $('.inner img').attr('src'),
				createdUtc: null,
				type
			}

			try {
				if (!listing.title.includes('Gift')) {
					await FeedItem.create(listing);
				};
			} catch (error) {
				console.error(error);
				return error;
			}
		})
		
	}
}