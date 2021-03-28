import React, { useEffect, useState } from 'react';
import { OtherHttp } from '../../http';
import { io } from 'socket.io-client';
const socket = io("http://127.0.0.1:5001")

import FeedItem from './../../components/feed/feed-item';
import SearchItem from './../../components/search/search-item';
import SearchInput from './../../components/form/search';

import styles from './feed.module.scss';
import Button from '../../components/button/button';

function feed() {
  const http = new OtherHttp();

  const [releases, setReleases] = useState([]);
  const [deals, setDeals] = useState([]);
  const [ebay, setEbay] = useState([]);
  const [ebaySearchTerm, setEbaySearchTerm] = useState('');

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
      const { listings } = (await http.instance.get(`/feed/ebay`)).data;
      setReleases(releases);
      setDeals(deals);
      setEbay(listings);
    } catch (error) {
      console.error(error);
    }
  }

  const updateEbaySearch = (event) => {
    const { value} = event.target;
    setEbaySearchTerm(value);
  }

  const searchEbay = async(e) => {
    e.preventDefault();
    const { results } = (await http.instance.post('/search/ebay', { query: ebaySearchTerm })).data;
    setEbay(results);
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
        <form className={styles.search} onSubmit={searchEbay}>
          <SearchInput placeholder="Search..." type="search" name="ebaySearch" onChange={updateEbaySearch}></SearchInput>
        </form>
        <ul>
          {ebay && ebay.length ? ebay.map((item, i) => (
            <SearchItem key={item._id ? item._id : i} item={item}></SearchItem>
          )) : 'No results'}
        </ul>
      </section>
    </div>
  )
}

export default feed;