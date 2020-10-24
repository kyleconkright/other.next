import { useRouter } from 'next/router';
import { Fragment, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';

import styles from './account.module.scss';
import userReducer from '../../reducers/user.reducer';
import { DefaultUserState } from '../../models/user';
import Button from '../../components/button/button';
import { UserContext } from '../../contexts/user.context';

function AccountSideBar() {

  const [, dispatchUser] = useReducer(userReducer, DefaultUserState);
  const { user } = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    console.log(user);
    if (!user.username && !user.loading && user.loaded) router.push('/');
  }, [user])

  async function logout(event) {
    try {
      const res = await axios.get('http://localhost:5001/auth/logout', { withCredentials: true });
      dispatchUser({type: 'SET', DefaultUserState});
      router.push('./');
    } catch (error) {
      console.error(error);
    }
  }

  async function loginToDiscogs() {
    router.push('http://localhost:5001/auth/discogs');
  }

  return (
    <div id="account-sidebar" className={styles.sidebar}>
      <div>
        { user.discogs?.token && user.discogs?.tokenSecret ? (
            <p>You are synced to Discogs with username {user.discogs.username}</p>
        ) : (
          <Fragment>
            <p>This site is meant to work with <a className="underline" href="http://www.discogs.com" target="_blank">Discogs</a>.<br></br>Sync your account for the full experience.</p>
            <Button text="Sync Discogs" onClick={loginToDiscogs}></Button>
          </Fragment>
          )}
          <ul>
            <li>Wantlist</li>
          </ul>
        </div>
      <div>
        <a className="underline" onClick={logout}>Logout</a>
      </div>
    </div>
  )
}

export default AccountSideBar;