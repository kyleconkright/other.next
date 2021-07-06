import { useEffect, useState } from 'react';

import { OtherHttp } from '../../http';

import SearchInput from '../form/search';
import OtherNumberInput from './../form/input/number';

import SearchItem from './items/search-item';

import styles from './../../pages/feed/feed.module.css';


export default function AmazonFeed() {
  const http = new OtherHttp();

  const [amazon, setAmazonResults] = useState([]);
  const [amazonSearchKeyword, setAmazonSearchKeyword] = useState({keyword: null});
  const [amazonSearchPrice, setAmazonSearchPrice] = useState({price: null });

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

  const updateKeyword = (event) => {
    const { value } = event.target;
    setAmazonSearchKeyword(value);
  }
  
  const updatePrice = (e) => {
    if ((e.keyCode > 47 && e.keyCode < 58) || e.keyCode === 8 || e.keyCode === 13) {
      const { value } = e.target;
      const price = value.replace(/\D/g, "")
      setAmazonSearchPrice(price);
    } else {
      e.preventDefault()
    }
  }
  
  const searchAmazon = async(e) => {
    e.preventDefault();
    const price = amazonSearchPrice ? Number(amazonSearchPrice) * 100 : null;
    const keyword = amazonSearchKeyword ? amazonSearchKeyword : null;
    const { results } = (await http.instance.post('/search/amazon', { query: {keyword, price }})).data;
    setAmazonResults(results);
  }

  return (
    <section>
      <h3><a href="https://amzn.to/3cwZC8z" target="_blank">Amazon</a></h3>
      <form className={styles.search} onSubmit={searchAmazon}>
        <SearchInput placeholder="Search..." type="search" name="keyword" onChange={updateKeyword}></SearchInput>
        <OtherNumberInput placeholder="Price Limit..." type="search" name="price" onChange={updatePrice}></OtherNumberInput>
        <button type='submit' className={styles.submitButton} />
      </form>
      <ul>
        {amazon && amazon.length ? amazon.map((item, i) => (
          <SearchItem key={item._id ? item._id : i} item={item}></SearchItem>
        )) : 'No results'}
      </ul>
    </section>
  )
}