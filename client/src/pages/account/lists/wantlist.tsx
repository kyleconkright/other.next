import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import styles from './../account.module.scss';
import withLayout from '../../../components/layouts';
import withAccountLayout from './../accountLayout';
import { AppState } from '../../../store/reducers';
import { DiscogsMediaConditions } from './../../../models/record';
import WantListItem from '../../../components/lists/want-list-item';

function AccountPage() {

  const user = useSelector((state: AppState) => state.user);
  const [ wantList, setWantList ] = useState([]);
  const [form, setForm] = useState({price: undefined});

  const router = useRouter();

  const options = Object.keys(DiscogsMediaConditions).map((key, i) => ({id: i, name: DiscogsMediaConditions[key], value: key}));
  
  useEffect(() => {
    if(user.discogs.token && user.discogs.tokenSecret && !user.loading) {
      getDiscogsWantList();
    }
  }, [user])


  async function getDiscogsWantList() {
    try {
      const { wants } = (await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/account/wants`, { discogs: user.discogs })).data;
      setWantList(wants);
    } catch(error) {
    }
  }

  function fetchRecord(item) {
    router.push(`./records/${item.id}`);
  }
  
 


  const updateForm = (event) => {
    const {name, value} = event.target;
    setForm({
      ...form,
      [name]: value,  
    } as any);
  }

  return (
    <div id="content" className={styles.wants}>
      <h2>Wantlist</h2>
      <ul>
        { wantList.length !== 0 ? wantList.map(item => (
          <WantListItem key={item.id} item={item}></WantListItem>
        )) : 'Loading...'}
      </ul>
    </div>
  )
}

export default withLayout(withAccountLayout(AccountPage));


// <a href={`https://www.discogs.com/sell/release/${item.id}`} target="_blank">For Sale</a>
