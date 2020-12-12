import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import styles from './../account.module.scss';
import withLayout from '../../../components/layouts';
import withAccountLayout from '../accountLayout';
import { AppState } from '../../../store/reducers';
import { DiscogsMediaConditions } from '../../../models/record';

function AccountPage() {

  const user = useSelector((state: AppState) => state.user);
  const [ wantList, setWantList ] = useState([]);

  const router = useRouter();

  const options = Object.keys(DiscogsMediaConditions).map((key, i) => ({id: i, name: DiscogsMediaConditions[key], value: key}));
  console.log({options});
  
  useEffect(() => {
    if(user.discogs.token && user.discogs.tokenSecret && !user.loading) {
      getDiscogsWantList();
    }
  }, [user])


  async function getDiscogsWantList() {
    try {
      const { wants } = (await axios.post('http://localhost:5001/account/wants', { discogs: user.discogs })).data;
      setWantList(wants);
    } catch(error) {
    }
  }

  function fetchRecord(item) {
    router.push(`./records/${item.id}`);
  }

  return (
    <div id="content" className={styles.wants}>
      <h2>Wantlist</h2>
      <ul>
        { wantList.length !== 0 ? wantList.map(item => (
          <li key={item.id}>
            <a onClick={() => fetchRecord(item)}>
              <img key={item.id} style={{width: '40px'}} src={ item.basic_information.thumb } />
              <div>
                <p>{ item.basic_information.artists[0].name }</p>
                <p className={styles.title}>{ item.basic_information.title }</p>
              </div>
            </a>
           
            <div className={styles.dropdown}>
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
            </div>

            <div className={styles.options}>
              <label htmlFor="price">Max Price</label>
              <input name="price" type="text"/>
            </div>
            
            <div className={styles.options}>
              <input type="checkbox" id="alert" name="alert" />
            </div>
          </li>
        )) : 'Loading...'}
      </ul>
    </div>
  )
}

export default withLayout(withAccountLayout(AccountPage));


// <a href={`https://www.discogs.com/sell/release/${item.id}`} target="_blank">For Sale</a>
