import { useRouter } from 'next/router'
import { useContext, useReducer } from 'react';
import axios from 'axios';

import styles from './header.module.scss';
import { UserContext } from '../../contexts/user.context';
import { DefaultHttpState } from '../../models/http';
import httpReducer from '../../reducers/http.reducer';

import Button from './../../components/button/button';

export default function Header() {

  const { user } = useContext(UserContext);

  const router = useRouter();

  async function auth(event) {
    router.push('http://localhost:5001/auth/discogs');
  }

  return (
    <header className={styles.header}>
      <h1><a onClick={() => router.push('/')}>Other Supply Co.</a></h1>
      <div>
        {user.username && !user.loading ? (
          <a onClick={() => router.push('/account')}><Button text="Account"></Button></a>
        ) : (
          user.loading ? (
            null
          ) : (
            <div>
              <a onClick={() => router.push('/login')}>Login</a>
            </div>
          )
        )}
      </div>
    </header>
  )
}
