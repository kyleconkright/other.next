import { useEffect, useState } from 'react';

import { OtherHttp } from '../../http';
import SearchItem from './items/search-item';

export default function TurntableLabFeed() {
  const http = new OtherHttp();

  const [ttl, setTurntableLabResults] = useState([]);

  useEffect(() => {
    getFeed();
  }, []);

  async function getFeed() {
    try {
      const { listings } = (await http.instance.get(`/feed/ttl`)).data;
      setTurntableLabResults(listings);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section>
      <h3><a href="https://www.turntablelab.com/collections/turntable-lab-exclusive-vinyl-pressings?_=pf&pf_st_stock_status=true" target="_blank">Turntable Lab Exclusives</a></h3>
      <ul>
        {ttl && ttl.length ? ttl.map((item, i) => (
          <SearchItem key={item._id ? item._id : i} item={item}></SearchItem>
        )) : 'No results'}
      </ul>
    </section>
  )
}