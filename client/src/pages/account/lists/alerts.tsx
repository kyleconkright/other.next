import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './../account.module.css';
import withLayout from '../../../components/layouts';
import withAccountLayout from '../accountLayout';
import { AppState } from '../../../store/reducers';
import { DiscogsMediaConditions } from '../../../models/record';

import { OtherHttp } from '../../../http';
import AlertListItem from '../../../components/lists/alert-list-item';

function AccountPage() {

  const user = useSelector((state: AppState) => state.user);
  const [ alertList, setAlertList ] = useState([]);


  const http = new OtherHttp();

  const options = Object.keys(DiscogsMediaConditions).map((key, i) => ({id: i, name: DiscogsMediaConditions[key], value: key}));
  
  useEffect(() => {
    if(user.discogs.token && user.discogs.tokenSecret && !user.loading) {
      getAlertList();
    }
  }, [user])


  async function getAlertList() {
    try {
      const alerts = (await http.instance.get('/user/alerts')).data;

      const formattedAlerts = alerts.reduce((acc, alert) => {
        return ({
          ...acc,
          [alert.item.masterId]: {
            ...acc[alert.item.masterId],
            [alert.item.id]: {
              ...alert.item,
              price: alert.price,
              notes: alert.details.notes,
            }
          }
        });
      }, {})
      let results = [];
      Object.values(formattedAlerts).forEach(alert => {
        results.push(Object.values(alert));
      });
      setAlertList(results);
    } catch(error) {
      console.error(error);
    }
  }

  async function deleteAlert(alert) {
    try {
      await http.instance.post('/user/alerts/delete', {item: alert});
      setAlertList(alertList.map(i => i.filter((j: any) => j.id !== alert.item.id)));
    } catch(error) {
      console.error(error);
    }
  }
 
  return (
    <div id="content" className={styles.wants}>
      <h2>Alert List</h2>
      <ul>
        <li className={styles.header}>
          <span>Release</span>
          <span className={styles.notes}>Notes</span>
          <span>Max Price</span>
          <span></span>
          <span></span>
        </li>
        { alertList.length !== 0 ? alertList.map((alert, index) => (
         <ul key={index}>
           { alert.map(item => (
             <AlertListItem item={item} key={item._id} onDelete={deleteAlert}></AlertListItem>
           ))}
         </ul>
        )): 'Loading...'}
      </ul>
    </div>
  )
}

export default withLayout(withAccountLayout(AccountPage));


// <a href={`https://www.discogs.com/sell/release/${item.id}`} target="_blank">For Sale</a>
