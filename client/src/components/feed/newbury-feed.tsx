import { useEffect, useState } from 'react';

import { OtherHttp } from '../../http';

import SearchInput from './../form/search';
import SearchItem from './items/search-item';

import styles from './../../pages/feed/feed.module.scss';

export default function NewburyFeed() {
  const http = new OtherHttp();

  const [newbury, setNewburyResults] = useState([]);

  useEffect(() => {
    getFeed();
  }, []);

  async function getFeed() {
    try {
      const { listings } = (await http.instance.get(`/feed/newbury`)).data;
      setNewburyResults(listings);
    } catch (error) {
      console.error(error);
    }
  }

  

  return (
    <section>
      <h3><a href="https://www.newburycomics.com/collections/exclusive-vinyl" target="_blank">Newbury Comics Exclusives</a></h3>
      <ul>
        {newbury && newbury.length ? newbury.map((item, i) => (
          <SearchItem key={item._id ? item._id : i} item={item}></SearchItem>
        )) : 'No results'}
      </ul>
    </section>
  )
}