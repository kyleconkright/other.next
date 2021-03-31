import * as cron from 'node-cron';
import axios from 'axios';
import FeedItem from './../../schemas/feedItem';

import { AmazonClient } from './../../controllers/amazon';
const amazon = new AmazonClient();

export class AmazonJob {
  public execute() {
    this.getDefaultListings();
    cron.schedule("0 0 */1 * * *", () => this.getDefaultListings())
  }

  async getDefaultListings() {
    let items;
    try {
      const results: any = await amazon.search({ price: 10000 });
      const type = 'amazon-listing';
      await FeedItem.deleteMany({ type });
      items = results.results.map(item => handleListing(item, type));
    } catch(error) {
      console.error(error);
    }
    return items;
  }
}

async function handleListing(item, type) {
  const listing = amazon.formatListing(item, type)
  try {
    await FeedItem.create(listing);
  } catch (error) {
    console.error(error);
    return error;
  }
  return listing;
}