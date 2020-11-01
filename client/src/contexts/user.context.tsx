import { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { DefaultUserState } from '../models/user';
import { AppState } from '../store/reducers';
import { CHECK_FOR_LOGGED_IN_USER, SET_USER } from '../store/actions/user.actions';

export const UserContext = createContext({
  user: DefaultUserState
});

const AuthContextProvider = props => {
  const user = useSelector((state: AppState) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    async function getUser() {
      dispatch({type: CHECK_FOR_LOGGED_IN_USER});
      try {
        const { user: userRes } = (await axios.get('http://localhost:5001/', { withCredentials :true })).data;
        dispatch({type: SET_USER, ...(userRes ? userRes : DefaultUserState), loading: false, loaded: true });
      } catch(error) {
        console.error(error);
      }
    }
    getUser();
  }, [])

  return (
    <UserContext.Provider value={{user}}>
      { props.children }
    </UserContext.Provider>
  );
}

export default AuthContextProvider;
