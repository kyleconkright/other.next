import { useEffect, useState } from 'react';

import { OtherHttp } from '../../http';

import SearchInput from './../form/search';
import SearchItem from './items/search-item';

import styles from './../../pages/feed/feed.module.css';


export default function AmazonFeed() {
  const http = new OtherHttp();

  const [amazon, setAmazonResults] = useState([]);
  const [amazonSearchTerm, setAmazonSearchTerm] = useState('green day');

  useEffect(() => {
    getFeed();
  }, []);

  async function getFeed() {
    try {
      const { listings } = (await http.instance.get(`/feed/amazon`)).data;
      setAmazonResults(listings);
    } catch (error) {
      console.error(error);
    }
  }

  const updateAmazonSearch = (event) => {
    const { value} = event.target;
    setAmazonSearchTerm(value);
  }

  const searchAmazon = async(e) => {
    e.preventDefault();
    const { results } = (await http.instance.post('/search/amazon', { query: {keyword: amazonSearchTerm, price: 10000 }})).data;
    setAmazonResults(results);
  }

  return (
    <section>
      <h3><a href="https://amzn.to/3cwZC8z" target="_blank">Amazon</a></h3>
      <form className={styles.search} onSubmit={searchAmazon}>
        <SearchInput placeholder="Search..." type="search" name="amazonSearch" onChange={updateAmazonSearch}></SearchInput>
      </form>
      <ul>
        {amazon && amazon.length ? amazon.map((item, i) => (
          <SearchItem key={item._id ? item._id : i} item={item}></SearchItem>
        )) : 'No results'}
      </ul>
    </section>
  )
}