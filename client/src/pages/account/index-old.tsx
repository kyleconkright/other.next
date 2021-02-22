import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import styles from './account.module.scss';
import withLayout from '../../components/layouts';
import withAccountLayout from './accountLayout';
import { AppState } from '../../store/reducers';
import { DiscogsMediaConditions } from '../../models/record';
import { OtherHttp } from '../../http';

function AccountPage() {

  const user = useSelector((state: AppState) => state.user);
  const [ wantList, setWantList ] = useState([]);
  const [form, setForm] = useState({price: undefined});

  const router = useRouter();
  const otherHttp = new OtherHttp();

  const options = Object.keys(DiscogsMediaConditions).map((key, i) => ({id: i, name: DiscogsMediaConditions[key], value: key}));
  // console.log({options});
  
  useEffect(() => {
    if(user.discogs.token && user.discogs.tokenSecret && !user.loading) {
      getDiscogsWantList();
    }
  }, [user])


  async function getDiscogsWantList() {
    try {
      const { wants } = (await axios.post('process.env.NEXT_PUBLIC_API_URL/account/wants', { discogs: user.discogs })).data;
      setWantList(wants);
    } catch(error) {
    }
  }

  function fetchRecord(item) {
    router.push(`./records/${item.id}`);
  }
  
  function setUpAlert(item) {
    axios.post('process.env.NEXT_PUBLIC_API_URL/user/alerts/create', { item, id: user._id, maxPrice: form.price })
  }
  
  function removeFromWantlist(item) {
    otherHttp.instance.post('process.env.NEXT_PUBLIC_API_URL/account/wants/remove', { id: item.id })
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
          <li key={item.id}>
            <a onClick={() => fetchRecord(item)}>
              <img key={item.id} style={{width: '40px'}} src={ item.basic_information.thumb } />
              <div>
                <p>{ item.basic_information.artists[0].name }</p>
                <p className={styles.title}>{ item.basic_information.title }</p>
              </div>
            </a>
            <input onChange={updateForm} name="price" type="text" placeholder="Max Price"/>
            <a onClick={() => setUpAlert(item)}>Set Up Alert</a>
            <a onClick={() => removeFromWantlist(item)}>Remove</a>
          </li>
        )) : 'Loading...'}
      </ul>
    </div>
  )
}

export default withLayout(withAccountLayout(AccountPage));


// <a href={`https://www.discogs.com/sell/release/${item.id}`} target="_blank">For Sale</a>
