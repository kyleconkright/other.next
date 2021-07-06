import { useEffect, useState } from 'react';

import { OtherHttp } from '../../http';

import SearchInput from '../form/search';
import SearchItem from './items/search-item';

import styles from './../../pages/feed/feed.module.css';

export default function UrbanOutfittersFeed() {
  const http = new OtherHttp();

  const [urbanoutfitters, setUrbanOutfittersResults] = useState([]);

  useEffect(() => {
    getFeed();
  }, []);

  async function getFeed() {
    try {
      const { listings } = (await http.instance.get(`/feed/urbanoutfitters`)).data;
      setUrbanOutfittersResults(listings);
    } catch (error) {
      console.error(error);
    }
  }

  

  return (
    <section>
      <h3><a href="https://www.urbanoutfitters.com/vinyl-records" target="_blank">Urban Outfitters</a></h3>
      <ul>
        {urbanoutfitters && urbanoutfitters.length ? urbanoutfitters.map((item, i) => (
          <SearchItem key={item._id ? item._id : i} item={item}></SearchItem>
        )) : 'No results'}
      </ul>
    </section>
  )
}