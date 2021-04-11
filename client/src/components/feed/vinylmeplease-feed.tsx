import { useEffect, useState } from 'react';

import { OtherHttp } from '../../http';

import SearchInput from './../form/search';
import SearchItem from './search-item';

import styles from './../../pages/feed/feed.module.scss';

export default function VinylMePleaseFeed() {
  const http = new OtherHttp();

  const [vinylmeplease, setVinylMePleaseResults] = useState([]);

  useEffect(() => {
    getFeed();
  }, []);

  async function getFeed() {
    try {
      const { listings } = (await http.instance.get(`/feed/vinylmeplease`)).data;
      setVinylMePleaseResults(listings);
    } catch (error) {
      console.error(error);
    }
  }

  

  return (
    <section>
      <h3><a href="https://www.vinylmeplease.com/collections/new-this-month" target="_blank">VinylMePlease Exclusives</a></h3>
      <ul>
        {vinylmeplease && vinylmeplease.length ? vinylmeplease.map((item, i) => (
          <SearchItem key={item._id ? item._id : i} item={item}></SearchItem>
        )) : 'No results'}
      </ul>
    </section>
  )
}