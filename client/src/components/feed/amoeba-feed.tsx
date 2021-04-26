import { useEffect, useState } from 'react';

import { OtherHttp } from '../../http';

import SearchInput from './../form/search';
import SearchItem from './items/search-item';

import styles from './../../pages/feed/feed.module.scss';

export default function AmoebaFeed() {
  const http = new OtherHttp();

  const [amoeba, setAmoebaResults] = useState([]);

  useEffect(() => {
    getFeed();
  }, []);

  async function getFeed() {
    try {
      const { listings } = (await http.instance.get(`/feed/amoeba`)).data;
      setAmoebaResults(listings);
    } catch (error) {
      console.error(error);
    }
  }

  

  return (
    <section>
      <h3><a href="https://www.amoeba.com/" target="_blank">Amoeba Records</a></h3>
      <ul>
        {amoeba && amoeba.length ? amoeba.map((item, i) => (
          <SearchItem key={item._id ? item._id : i} item={item}></SearchItem>
        )) : 'No results'}
      </ul>
    </section>
  )
}