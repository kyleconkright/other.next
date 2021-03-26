import React, { useEffect, useState } from 'react';
import { OtherHttp } from '../../http';
import { io } from 'socket.io-client';
const socket = io("http://127.0.0.1:5001")

import FeedItem from './../../components/feed/feed-item';
import SearchItem from './../../components/search/search-item';

import styles from './feed.module.scss';

function feed() {
  const http = new OtherHttp();

  const [releases, setReleases] = useState([]);
  const [deals, setDeals] = useState([]);
  const [ebay, setEbay] = useState([]);

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
      const { itemSummaries: ebay } = (await http.instance.get(`/search/ebay`)).data.results;
      setReleases(releases);
      setDeals(deals);
      setEbay(ebay);
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
     
      <section>
        <h3><a href="https://www.ebay.com/b/Vinyl-Records/176985/bn_1860303" target="_blank">Ebay</a></h3>
        {/* <ul>
          {ebay.length != 0 ? ebay.map(item => (
            <SearchItem key={item.itemId} item={item}></SearchItem>
          )) : null}
        </ul> */}
      </section>
    </div>
  )
}

export default feed;