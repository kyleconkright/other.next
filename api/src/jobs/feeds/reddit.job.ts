import axios from 'axios';
import FeedItem from './../../schemas/feedItem';

import * as cron from 'node-cron';

export class RedditJob {
  public async execute() {
    cron.schedule("*/30 * * * * *", async () => {
      FeedItem.deleteMany({}, () => {});
      const { data } = await await axios.get('https://www.reddit.com/r/VinylReleases/new.json');
      data.data.children.map(async post => {
        try {
          const feedItem = await FeedItem.create(
            {
              title: post.data.title,
              url: post.data.url_overridden_by_dest,
              origin: `https://www.reddit.com/${post.data.permalink}`,
              flair: post.data.link_flair_text,
              imageUrl: post.data.thumbnail,
              createdUtc: post.data.created_utc
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