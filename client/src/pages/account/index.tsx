import { useRouter } from 'next/router';
import { useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';

import styles from './account.module.scss';
import { UserContext } from '../../contexts/user.context';
import withLayout from '../../components/layouts';
import withAccountLayout from './accountLayout';
import { DefaultHttpState } from '../../models/http';
import httpReducer from '../../reducers/http.reducer.';

function AccountPage() {

  const router = useRouter();

  const { user } = useContext(UserContext);
  const [ wantList, setWantList ] = useState([]);
  const [ http, dispatchHttp ] = useReducer(httpReducer, DefaultHttpState);

  
  useEffect(() => {
    if(user.discogs.token && user.discogs.tokenSecret && !user.loading) {
      getDiscogsWantList();
    }
  }, [user])


  async function getDiscogsWantList() {
    try {
      dispatchHttp({type: 'SEND'});
      const { wants } = (await axios.post('http://localhost:5001/account/wants', { discogs: user.discogs })).data;
      setWantList(wants);
      dispatchHttp({type: 'RESPONSE'});
    } catch(error) {
      dispatchHttp({type: 'ERROR'});
    }
  }

  return (
    <div id="content" className={styles.wants}>
      <h2>Wantlist</h2>
      <ul>
        { wantList.map(item => (
          <li key={item.id}>
            <div>
              <img key={item.id} style={{width: '40px'}} src={ item.basic_information.thumb } />
              <div>
                <p>{ item.basic_information.artists[0].name }</p>
                <p className={styles.title}>{ item.basic_information.title }</p>
              </div>
            </div>
            {/* <a href={`https://www.discogs.com/sell/release/${item.id}`} target="_blank">For Sale</a>
            <a href={`https://www.bullmoose.com/search?q=${item.basic_information.title}%20${item.basic_information.artists[0].name}&af=-2003`} target="_blank">Bullmoose</a> */}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default withLayout(withAccountLayout(AccountPage));