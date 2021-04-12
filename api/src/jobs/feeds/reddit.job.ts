import axios from 'axios';
import FeedItem from './../../schemas/feedItem';

import { io } from './../../server';

import * as cron from 'node-cron';
export class RedditJob {
  public async execute() {

    setInterval(checkRedditReleases, 60000);
    setInterval(checkRedditDeals, 60000);

    io.on('connection', (socket) => {
      socket.on('get-releases', checkRedditReleases);
      socket.on('get-deals', checkRedditDeals);
    });

    async function checkRedditReleases() {
      await FeedItem.deleteMany({ type: 'reddit-release' });
      const { data: releases } = await await axios.get('https://www.reddit.com/r/VinylReleases/new.json');
      const results = releases.data.children.map(post => {
        const item = {
          title: post.data.title,
          url: post.data.url_overridden_by_dest ? post.data.url_overridden_by_dest : `https://www.reddit.com${post.data.permalink}`,
          origin: `https://www.reddit.com${post.data.permalink}`,
          flair: post.data.link_flair_text,
          imageUrl: post.data.thumbnail,
          createdUtc: post.data.created_utc,
          type: 'reddit-release'
        }
        return item;
      });
      io.emit('release-feed', results);
      await FeedItem.create(results);
    };

    async function checkRedditDeals() {
      await FeedItem.deleteMany({ type: 'reddit-deal' });
      const { data: releases } = await await axios.get('https://www.reddit.com/r/VinylDeals/new.json');
      const results = releases.data.children.map(post => {
        const item = {
          title: post.data.title,
          url: post.data.url_overridden_by_dest ? post.data.url_overridden_by_dest : `https://www.reddit.com${post.data.permalink}`,
          origin: `https://www.reddit.com${post.data.permalink}`,
          flair: post.data.link_flair_text,
          imageUrl: post.data.thumbnail,
          createdUtc: post.data.created_utc,
          type: 'reddit-deal'
        }
        return item;
      });
      io.emit('deal-feed', results);
      await FeedItem.create(results);
    };

  }
}