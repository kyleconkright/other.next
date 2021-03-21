import axios from 'axios';
import FeedItem from './../../schemas/feedItem';

import * as cron from 'node-cron';
export class RedditJob {
  public async execute() {
    cron.schedule("*/30 * * * * *", async () => {
      FeedItem.deleteMany({}, () => {});
      const { data: releases } = await await axios.get('https://www.reddit.com/r/VinylReleases/new.json');
      const { data: deals } = await await axios.get('https://www.reddit.com/r/VinylDeals/new.json');
      releases.data.children.map(async post => {
        try {
          const feedItem = await FeedItem.create(
            {
              title: post.data.title,
              url: post.data.url_overridden_by_dest ? post.data.url_overridden_by_dest : `https://www.reddit.com/${post.data.permalink}`,
              origin: `https://www.reddit.com/${post.data.permalink}`,
              flair: post.data.link_flair_text,
              imageUrl: post.data.thumbnail,
              createdUtc: post.data.created_utc,
              type: 'reddit-release'
            }
          );
        } catch(error) {
          console.error(error);
          return error;
        }
      });

      deals.data.children.map(async post => {
        try {
          const feedItem = await FeedItem.create(
            {
              title: post.data.title,
              url: post.data.url_overridden_by_dest ? post.data.url_overridden_by_dest : `https://www.reddit.com/${post.data.permalink}`,
              origin: `https://www.reddit.com/${post.data.permalink}`,
              flair: post.data.link_flair_text,
              imageUrl: post.data.thumbnail,
              createdUtc: post.data.created_utc,
              type: 'reddit-deal'
            }
          );
        } catch(error) {
          console.error(error);
          return error;
        }
      });
    }, {})
  }
}