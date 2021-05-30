import { useRouter } from 'next/router';
import Link from 'next/link'
import { Fragment, useContext, useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import styles from './account.module.css';
import { UserContext } from '../../contexts/user.context';
import { SET_USER } from '../../store/actions/user.actions';
import { DefaultUserState } from '../../models/user';

function AccountSideBar() {

  const { user } = useContext(UserContext);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.username && !user.loading && user.loaded) router.push('/');
  }, [user])

  async function logout(event) {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, { withCredentials: true });
      dispatch({type: SET_USER, ...DefaultUserState, loading: false });
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div id="account-sidebar" className={styles.sidebar}>
      <div>
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
                Notification List
              </Link>
            </li>
            <li>
              <Link href="/account/lists/wantlist">
                Discogs Wantlist
              </Link>
            </li>
          </ul>
        </div>
      <div>
        <a className="underline" onClick={logout}>Logout</a>&nbsp;
        <a className="underline" href="mailto:kyleconkright@gmail.com">Help</a>
      </div>
    </div>
  )
}

export default AccountSideBar;