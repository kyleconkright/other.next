import React, { useEffect, useState } from 'react';
import { OtherHttp } from '../../http';
import { io } from 'socket.io-client';
const socket = io("http://127.0.0.1:5001")

import FeedItem from './../../components/feed/feed-item';
import EbayFeed from '../../components/feed/ebay/ebay-feed';

import styles from './feed.module.scss';

function feed() {
  const http = new OtherHttp();

  const [releases, setReleases] = useState([]);
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    // socket.emit('getFeed');
    // socket.on('release-feed', data => setReleases(data));
    // socket.on('deal-feed', data => setDeals(data));
    getFeed();
  }, [])

  async function getFeed() {
    try {
      const { releases } = (await http.instance.get(`/feed/reddit/releases`)).data;
      const { deals } = (await http.instance.get(`/feed/reddit/deals`)).data;
      setReleases(releases);
      setDeals(deals);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div id={styles.feedContent}  className={styles.feedList}>
      <section>
        <h3><a href="https://reddit.com/r/VinylReleases/new" target="_blank">r/VinylReleases/new</a></h3>
        <ul>
          {releases.length != 0 ? releases.map(item => (
            <FeedItem key={item._id} item={item}></FeedItem>
          )) : null}
        </ul>
      </section>
      
      <section>
        <h3><a href="https://reddit.com/r/VinylDeals/new" target="_blank">r/VinylDeals/new</a></h3>
        <ul>
          {deals.length != 0 ? deals.map(item => (
            <FeedItem key={item._id} item={item}></FeedItem>
          )) : null}
        </ul>
      </section>

      <EbayFeed></EbayFeed>
  
    </div>
  )
}

export default feed;