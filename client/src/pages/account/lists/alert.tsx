import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import styles from './../account.module.scss';
import withLayout from '../../../components/layouts';
import withAccountLayout from '../accountLayout';
import { AppState } from '../../../store/reducers';
import { DiscogsMediaConditions } from '../../../models/record';

import { OtherHttp } from './../../../http';

function AccountPage() {

  const user = useSelector((state: AppState) => state.user);
  const [ AlertList, setAlertList ] = useState([]);

  const router = useRouter();

  const http = new OtherHttp();

  const options = Object.keys(DiscogsMediaConditions).map((key, i) => ({id: i, name: DiscogsMediaConditions[key], value: key}));
  // console.log({options});
  
  useEffect(() => {
    if(user.discogs.token && user.discogs.tokenSecret && !user.loading) {
      getAlertList();
    }
  }, [user])


  async function getAlertList() {
    try {
      const alerts = (await http.instance.get('/user/alerts')).data;
      console.log(alerts);
      setAlertList(alerts);
    } catch(error) {
      console.error(error);
    }
  }

  function fetchRecord(item) {
    router.push(`./../../records/${item.item.id}`);
  }

  return (
    <div id="content" className={styles.wants}>
      <h2>Alert List</h2>
      <ul>
        { AlertList.length !== 0 ? AlertList.map(alert => (
          <li key={alert._id}>
            <a target="_blank" href={`https://www.discogs.com/sell/release/${alert.item.id}?price1=&price2=${alert.price}&currency=USD`}>
              <img style={{width: '40px'}} src={ alert.item.cover } />
              <div>
                <p>{ alert.item.artist }</p>
                <p className={styles.title}>{ alert.item.title }</p>
              </div>
            </a>
           
            {/* <div className={styles.dropdown}>
              <label htmlFor="media-condition">Media Condition</label>
              <select id="media-condition">{
                options.map(item => <option key={item.id} value={item.value}>{item.name}</option>)
              }</select>
            </div>
            
            <div className={styles.dropdown}>
              <label htmlFor="sleeve-condition">Sleeve Condition</label>
              <select id="sleeve-condition">{
                options.map(item => <option key={item.id} value={item.value}>{item.name}</option>)
              }</select>
            </div> */}

            <div>
              <input name="price" value={alert.price} type="text"/>
            </div>
            
            {/* <div className={styles.options}>
              <input type="checkbox" id="alert" name="alert" />
            </div> */}
          </li>
        )) : 'Loading...'}
      </ul>
    </div>
  )
}

export default withLayout(withAccountLayout(AccountPage));


// <a href={`https://www.discogs.com/sell/release/${item.id}`} target="_blank">For Sale</a>
