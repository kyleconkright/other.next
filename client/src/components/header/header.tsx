import { useRouter } from 'next/router'
import { useContext } from 'react';
import axios from 'axios';

import styles from './header.module.scss';
import { UserContext } from '../../contexts/user.context';

export default function Header(props) {

  const { user, setUser } = useContext(UserContext)

  const router = useRouter()

  function auth(event) {
    event.preventDefault();
    router.push('http://localhost:5001/auth/discogs');
  }
  
  async function logout(event) {
    event.preventDefault();
    try {
      const res = await axios.get('http://localhost:5001/auth/logout');
      console.log(res);
      setUser({user: undefined});
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <header className={styles.header}>
      <h1>Other Supply Co.</h1>
      <div>
        { user.username ? (
          <a onClick={logout}>Logout { user.username }</a>
        ) : (
          <a onClick={auth}>Discogs Login</a>
        ) }
      </div>
    </header>
  )
}
