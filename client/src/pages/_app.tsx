import './../styles/stylesheet.scss';
import { UserContext } from '../contexts/user.context';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function OtherApp({ Component, pageProps }) {

  const [user, setUser] = useState({username: undefined, id: undefined, token: undefined, tokenSecret: undefined});

  useEffect(() => {
    async function getUser() {
      try {
        // const { token, tokenSecret, username, id } = (await axios.get('http://localhost:5001/', { withCredentials :true })).data;
        const { user } = (await axios.get('http://localhost:5001/', { withCredentials :true })).data;
        setUser({...user});
      } catch(error) {
        console.error(error);
      }
    }
    getUser();
  }, [setUser])

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Component {...pageProps} />
    </UserContext.Provider>
  )
}