import { useEffect, useState } from 'react';

import { OtherHttp } from '../../http';

import SearchInput from '../form/search';
import SearchItem from './items/search-item';

import styles from './../../pages/feed/feed.module.css';


export default function EbayFeed() {
  const http = new OtherHttp();

  const [ebay, setEbayResults] = useState([]);
  const [ebaySearchTerm, setEbaySearchTerm] = useState([]);

  useEffect(() => {
    getFeed();
  }, []);

  async function getFeed() {
    try {
      const { listings } = (await http.instance.get(`/feed/ebay`)).data;
      setEbayResults(listings);
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
    setEbayResults(results);
  }

  return (
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
  )
}