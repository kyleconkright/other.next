import { useEffect, useState } from 'react';

import { OtherHttp } from '../../http';

import SearchInput from '../form/search';
import OtherNumberInput from './../form/input/number';

import SearchItem from './items/search-item';

import styles from './../../pages/feed/feed.module.css';

export default function AmazonFeed() {
  const http = new OtherHttp();

  const [amazon, setAmazonResults] = useState([]);
  const [amazonSearchValue, setAmazonSearchValue] = useState({keyword: '', price: '' });

  useEffect(() => {
    getFeed();
  }, []);

  async function getFeed() {
    console.log(amazonSearchValue);
    try {
      const { listings } = (await http.instance.get(`/feed/amazon`)).data;
      setAmazonResults(listings);
    } catch (error) {
      console.error(error);
    }
  }

  const updateAmazonValue = (event) => {
    const { name, value } = event.target;
    const searchFields = {
      ...amazonSearchValue,
      [name]: value,
    } as any
    setAmazonSearchValue(searchFields);
  }
  
  const searchAmazon = async(e) => {
    e.preventDefault();
    const price = amazonSearchValue.price !== "" ? Number(amazonSearchValue.price) * 100 : null;
    const keyword = amazonSearchValue.keyword !== "" ? amazonSearchValue.keyword : null;
    const { results, error } = (await http.instance.post('/search/amazon', { query: {keyword, price }})).data;
    setAmazonResults(results);
  }

  return (
    <section>
      <h3><a href="https://amzn.to/3cwZC8z" target="_blank">Amazon</a></h3>
      <form className={styles.search} onSubmit={searchAmazon}>
        <SearchInput placeholder="Search..." type="search" name="keyword" onChange={updateAmazonValue}></SearchInput>
        <OtherNumberInput placeholder="Price Limit..." type="search" name="price" onChange={updateAmazonValue}></OtherNumberInput>
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