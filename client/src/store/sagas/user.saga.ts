import axios from 'axios';

import { takeLatest, call, put } from 'redux-saga/effects';
import { USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGOUT, SET_USER, CHECK_FOR_LOGGED_IN_USER, USER_LOGOUT_SUCCESS, UPDATE_USER, UPDATE_USER_SUCCESS } from '../actions/user.actions';
import { DefaultUserState } from '../../models/user';


function* userLogin(action) {
  const { email } = action.user;
  try {
    yield call(loginToApp, email);
    yield put({ type: USER_LOGIN_SUCCESS, email })
  } catch (err) {
    console.log(err);
  }
}

async function loginToApp(email) {
  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, { email }).then(() => {
    window.localStorage.setItem('print-supply-email', email);
  }).catch(err => console.error(err));
}

function* userLogout() {
  try {
    yield call(() => axios.post(`${process.env.NEXT_PUBLIC_API_URL}/logout`));
    yield put({ type: USER_LOGOUT_SUCCESS, user: DefaultUserState})
  } catch (err) {
    console.log(err);
  }
}

function* userUpdate(action) {
  const { user} = action;
  console.log(user);
  try {
    yield call(() => axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/update`, { user }));
    yield put({ type: UPDATE_USER_SUCCESS, user: DefaultUserState})
  } catch (err) {
    console.log(err);
  }
}

const userSaga = [
  takeLatest(
    USER_LOGIN,
    userLogin
  ),
  takeLatest(
    USER_LOGOUT,
    userLogout
  ),
  takeLatest(
    UPDATE_USER,
    userUpdate
  ),
]

export default userSaga;