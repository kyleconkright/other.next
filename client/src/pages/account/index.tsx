import { useRouter } from 'next/router';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';

import styles from './account.module.scss';
import { UserContext } from '../../contexts/user.context';
import withLayout from '../../components/layouts';
import withAccountLayout from './accountLayout';

function AccountPage() {

  const { user } = useContext(UserContext);
  const [ wantList, setWantList ] = useState([]);

  const router = useRouter();
  
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
            {/* <a href={`https://www.discogs.com/sell/release/${item.id}`} target="_blank">For Sale</a>
            <a href={`https://www.bullmoose.com/search?q=${item.basic_information.title}%20${item.basic_information.artists[0].name}&af=-2003`} target="_blank">Bullmoose</a> */}
          </li>
        )) : 'Loading...'}
      </ul>
    </div>
  )
}

export default withLayout(withAccountLayout(AccountPage));