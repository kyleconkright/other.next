import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { DefaultUserState } from '../models/user';

export const UserContext = createContext({user: DefaultUserState, setUser: (user) => {}});

const AuthContextProvider = props => {
  const [user, setUser] = useState(DefaultUserState);

  useEffect(() => {
    async function getUser() {
      try {
        // const { token, tokenSecret, username, id } = (await axios.get('http://localhost:5001/', { withCredentials :true })).data;
        const { user } = (await axios.get('http://localhost:5001/', { withCredentials :true })).data;
        setUser(user ? user : DefaultUserState);
        console.log(user);
      } catch(error) {
        console.error(error);
      }
    }
    getUser();
  }, [setUser])

  return (
    <UserContext.Provider value={{user, setUser}}>
      { props.children }
    </UserContext.Provider>
  );
}

export default AuthContextProvider;
