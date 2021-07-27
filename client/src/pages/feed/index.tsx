import React, { useContext, useEffect, useState } from 'react';
import { OtherHttp } from '../../http';
import { io } from 'socket.io-client';
const socket = io(process.env.NEXT_PUBLIC_API_URL)

import { useSelector } from 'react-redux';
import { AppState } from 'src/store/reducers';

import FeedItem from '../../components/feed/items/feed-item';
import WantListFeed from 'src/components/feed/want-list-feed';
import EbayFeed from '../../components/feed/ebay-feed';
import AmazonFeed from '../../components/feed/amazon-feed';
import AmoebaFeed from 'src/components/feed/amoeba-feed';
import RoughTradeFeed from 'src/components/feed/rough-trade-feed';
import NewburyFeed from 'src/components/feed/newbury-feed';
import VinylMePleaseFeed from 'src/components/feed/vinylmeplease-feed';

import styles from './feed.module.css';

function feed() {
  const http = new OtherHttp();

  const user = useSelector((state: AppState) => state.user);
  const [releases, setReleases] = useState([]);
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    socket.emit('get-releases');
    socket.emit('get-deals');
    socket.on('release-feed', data => setReleases(data));
    socket.on('deal-feed', data => setDeals(data));
  }, [])

  return (
    <div id={styles.feedContent}  className={styles.feedList}>

      { user._id ? (
        <WantListFeed></WantListFeed>
      ): null }

      <section>
        <h3><a href="https://reddit.com/r/VinylReleases/new" target="_blank">r/VinylReleases/new</a></h3>
        <ul>
          {releases.length != 0 ? releases.map((item, i) => (
            <FeedItem key={i} item={item}></FeedItem>
          )) : null}
        </ul>
      </section>
      
      <section>
        <h3><a href="https://reddit.com/r/VinylDeals/new" target="_blank">r/VinylDeals/new</a></h3>
        <ul>
          {deals.length != 0 ? deals.map((item, i) => (
            <FeedItem key={i} item={item}></FeedItem>
          )) : null}
        </ul>
      </section>

      <AmoebaFeed></AmoebaFeed>
      <RoughTradeFeed></RoughTradeFeed>
      <NewburyFeed></NewburyFeed>
      <VinylMePleaseFeed></VinylMePleaseFeed>
      <EbayFeed></EbayFeed>
      {/* <AmazonFeed></AmazonFeed> */}
      
    </div>
  )
}

export default feed;