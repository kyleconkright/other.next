import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import styles from './account.module.scss';
import { UserContext } from '../../contexts/user.context';
import withLayout from '../../components/layouts';
import withAccountLayout from './accountLayout';

function AccountPage() {

  const router = useRouter();

  const { user, setUser } = useContext(UserContext);
  const [wantList, setWantList] = useState([]);

  useEffect(() => {
    if (!user.username) router.push('/');
    if(user.discogs.token && user.discogs.tokenSecret) {
      getDiscogsWantList();
    }
  }, [user])


  async function getDiscogsWantList() {
    const { wants } = (await axios.post('http://localhost:5001/account/wants', { discogs: user.discogs })).data;
    setWantList(wants);
  }

  return (
    <div id="content" className={styles.wants}>
      <h2>Wantlist</h2>
      <ul>
        { wantList.map(item => (
          <li key={item.id}>
            <img key={item.id} style={{width: '40px'}} src={ item.basic_information.thumb } />
            <div>
              <p>{ item.basic_information.artists[0].name }</p>
              <p className={styles.title}>{ item.basic_information.title }</p>
            </div>
          </li>
         )
        )}
      </ul>
    </div>
  )
}

export default withLayout(withAccountLayout(AccountPage));