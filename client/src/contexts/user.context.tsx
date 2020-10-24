import { createContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { DefaultUserState } from '../models/user';
import userReducer from '../reducers/user.reducer';
import { DefaultHttpState } from '../models/http';
import httpReducer from '../reducers/http.reducer.';

export const UserContext = createContext({
  user: DefaultUserState, dispatchUser: (user) => {}});

const AuthContextProvider = props => {
  const [user, dispatchUser] = useReducer(userReducer, DefaultUserState);
  const [wants, setWants] = useState([]);

  useEffect(() => {
    async function getUser() {
      dispatchUser({type: 'SET', loading: true});
      try {
        const { user: userRes } = (await axios.get('http://localhost:5001/', { withCredentials :true })).data;
        dispatchUser({type: 'SET', ...(userRes ? userRes : DefaultUserState), loading: false, loaded: true });
      } catch(error) {
        console.error(error);
      }
    }
    getUser();
  }, [])

  return (
    <UserContext.Provider value={{user, dispatchUser}}>
      { props.children }
    </UserContext.Provider>
  );
}

export default AuthContextProvider;
