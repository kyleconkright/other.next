import './../styles/stylesheet.scss';
import  UserContextProvider, { UserContext } from '../contexts/user.context';
import { useEffect, useState } from 'react';

export default function OtherApp({ Component, pageProps }) {

  const [user, setUser] = useState({
    username: undefined,
    id: undefined,
    token: undefined,
    tokenSecret: undefined,
  });

  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  )
}