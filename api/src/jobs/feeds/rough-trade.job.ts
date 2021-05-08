import { PuppeteerClient } from './../../controllers/puppeteer';
const cheerio = require('cheerio');
import * as cron from 'node-cron';
import { io } from './../../server';

import FeedItem from './../../schemas/feedItem';

const puppeteer = new PuppeteerClient();
const type = 'rough-trade'

export class RoughTradeJob {
  public async execute() {
    this.getListings();
  }

  async getListings() {
    cron.schedule("30 0 */1 * * *", async () => {
      try {
        const result = await puppeteer.scrape("https://www.roughtrade.com/us/s/item-type/music/format/lp?_=1619576920999&sort=created_at_desc", '#product-list');
        await FeedItem.deleteMany({ type });

        const $ = await cheerio.load(result[0]);
        const results = [];
        $("div.product-item").each(async (i, elem) => {
          const title = $(elem).find("a.product-item__artist-link").text().replace(', artist', '').replace('\n\n', '') + ' - ' + $(elem).find("h2").text().replace(', title', '');
          const url = "https://www.roughtrade.com/" + $(elem).find("a.product-item__product-link").attr("href");
          const imageUrl = $(elem).find(".packshot").attr("data-lazyload-style").match(/\((.*)\)/).pop().replace(/"/g, '');
          const listing = {
            title,
            url,
            imageUrl,
            origin: url,
            flair: null,
            price: null,
            createdUtc: null,
            type
          }
          results.push(listing);
        })

        io.emit('set-rough-trade', results);
        await FeedItem.create(results);
      } catch (error) {
        console.error(error);
        return error;
      }
    })

  }
}