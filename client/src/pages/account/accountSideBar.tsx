import { useRouter } from 'next/router';
import Link from 'next/link'
import { Fragment, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';

import styles from './account.module.scss';
import { DefaultUserState } from '../../models/user';
import Button from '../../components/button/button';
import { UserContext } from '../../contexts/user.context';

function AccountSideBar() {

  const { user } = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (!user.username && !user.loading && user.loaded) router.push('/');
  }, [user])

  async function logout(event) {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, { withCredentials: true });
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  }

  async function loginToDiscogs() {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/discogs`);
  }

  return (
    <div id="account-sidebar" className={styles.sidebar}>
      <div>
        { user.discogs?.token && user.discogs?.tokenSecret ? (
            <p>You are synced to Discogs with username {user.discogs.username}</p>
        ) : (
          !user.loading ? (
            <Fragment>
              <p>This site is meant to work with <a className="underline" href="http://www.discogs.com" target="_blank">Discogs</a>.<br></br>Sync your account for the full experience.</p>
              <Button text="Sync Discogs" onClick={loginToDiscogs}></Button>
            </Fragment>
          ) : ''
        )}
          <ul>
            <li>
              <Link href="/account">
                Settings
              </Link>
            </li>
            <li>
              <h3>Lists</h3>
            </li>
            <li>
              <Link href="/account/lists/alerts">
                Alerts
              </Link>
            </li>
            <li>
              <Link href="/account/lists/wantlist">
                Wantlist
              </Link>
            </li>
          </ul>
        </div>
      <div>
        <a className="underline" onClick={logout}>Logout</a>
      </div>
    </div>
  )
}

export default AccountSideBar;