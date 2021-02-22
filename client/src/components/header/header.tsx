import { useRouter } from 'next/router'
import { useContext, useReducer } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import styles from './header.module.scss';
import { UserContext } from '../../contexts/user.context';
import { DefaultHttpState } from '../../models/http';

import Button from './../../components/button/button';
import { AppState } from '../../store/reducers';

export default function Header() {

  const user = useSelector((state: AppState) => state.user);

  const router = useRouter();

  async function auth(event) {
    router.push('process.env.NEXT_PUBLIC_API_URL/auth/discogs');
  }

  return (
    <header className={styles.header}>
      <h1><a onClick={() => router.push('/')}>Other Supply Co.</a></h1>
      <div>
        { user.username && !user.loading ? (
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
