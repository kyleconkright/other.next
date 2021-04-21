import React, { useEffect, useState } from 'react';

import AlertItem from './items/alert-item';
import { OtherHttp } from '../../http';

import styles from './../../pages/feed/feed.module.scss';
import { useRouter } from 'next/router';

export default function WantListFeed() {
  const http = new OtherHttp();
  const router = useRouter();

  const [alerts, setAlerts] = useState([]);
  
  useEffect(() => {
    getAlertList();
  }, []);

  async function getAlertList() {
    try {
      const alerts = (await http.instance.get("/user/alerts")).data;
      setAlerts(alerts);
    } catch(error) {
    }
  }

  const goToWantlist = (e) => {
    e.preventDefault()
    router.push("account/lists/alerts")
  }

  return (
    <section>
      <h3><a onClick={goToWantlist}>Alert List</a></h3>
      <ul>
        {alerts && alerts.length ? alerts.map((item, i) => (
          <AlertItem key={item._id } item={item}></AlertItem>
        )) : "No results"}
      </ul>
    </section>
  )
}