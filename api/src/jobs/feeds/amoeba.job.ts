import axios from 'axios';
const cheerio = require('cheerio');
import * as cron from 'node-cron';
import { format } from 'node:path';

import FeedItem from './../../schemas/feedItem';

const type = 'amoeba'

export class AmoebaJob {
	public async execute() {
		await this.getListings();
		cron.schedule("15 0 */1 * * *", async () => {
      try {
        await this.getListings();
      } catch (error) {
        console.error(error);
        return ({ message: 'Something went wrong: Amoeba' })
      }
    })
	}

	async getListings() {
		const result = await axios.get('https://www.amoeba.com/ajax/cds_and_vinyl.php?show=50&page=1&format%5B3%5D=3&type=new')
		const data = result.data.data;
		await FeedItem.deleteMany({ type });

		const $ = await cheerio.load(`<table><tbody>${data}</tbody></table>`);
		$('tr').each(async (i, elem) => {
			const title = $(elem).find('td:nth-of-type(2) p a').text() + ' - ' +  $(elem).find('td.track-title-cell div.search-deets p a').text();
			const imageUrl = $(elem).find('div.search-thumb a img').attr('src').replace('50/50', '1000/1000');
			const price = Number($(elem).find('span.price span').text().replace('$',''));
			const url = 'http://amoeba.com' + $(elem).find('td.track-title-cell div.search-deets p a').attr('href');
		
			const listing = {
				title,
				url,
				origin: url,
				flair: null,
				price,
				imageUrl,
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