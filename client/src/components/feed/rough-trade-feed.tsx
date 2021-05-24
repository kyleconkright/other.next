import { useEffect, useState } from 'react';
import { OtherHttp } from '../../http';
import SearchItem from './items/search-item';

import { io } from 'socket.io-client';
const socket = io(process.env.NEXT_PUBLIC_API_URL)

export default function RoughTradeFeed() {
  const http = new OtherHttp();

  const [roughTrade, setRoughTradeResults] = useState([]);

  useEffect(() => {
    getFeed();
    socket.on('set-rough-trade', data => setRoughTradeResults(data));
  }, []);

  async function getFeed() {
    try {
      const { listings } = (await http.instance.get(`/feed/roughtrade`)).data;
      setRoughTradeResults(listings);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section>
      <h3><a href="https://www.roughtrade.com/us/s/item-type/music/format/lp?_=1619576920999&sort=created_at_desc" target="_blank">Rough Trade</a></h3>
      <ul>
        {roughTrade && roughTrade.length ? roughTrade.map((item, i) => (
          <SearchItem key={item._id ? item._id : i} item={item}></SearchItem>
        )) : 'Loading...'}
      </ul>
    </section>
  )
}