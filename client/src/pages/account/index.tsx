import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import axios from 'axios';

import styles from './account.module.scss';
import withLayout from "../../components/layouts";
import { UserContext } from '../../contexts/user.context';
import { DefaultUserState } from '../../models/user';
import Button from './../../components/button/button';

function AccountPage() {

  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user.username) router.push('/')
  }, [user])

  async function logout(event) {
    try {
      const res = await axios.get('http://localhost:5001/auth/logout', { withCredentials: true });
      setUser(DefaultUserState);
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
      { user.discogs.token && user.discogs.tokenSecret ? (
        <div>
          <p>You are synced</p>
        </div>
      ) : (
          <div>
            <p>This site is meant to work with <a className="underline" href="http://www.discogs.com" target="_blank">Discogs</a>.<br></br>Sync your account for the full experience.</p>
            <Button text="Sync Discogs" onClick={loginToDiscogs}></Button>
          </div>
        )}
      <div>
        <a className="underline" onClick={logout}>Logout</a>
      </div>
    </div>
  )
}

export default withLayout(AccountPage);