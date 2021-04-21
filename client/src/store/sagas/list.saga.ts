import { OtherHttp } from './../../http'
import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_ALERT_LIST, GET_ALERT_LIST_SUCCESS } from '../actions/list.actions';

const http = new OtherHttp();

function* getAlertList() {
  try {
    const alerts = yield call(fetchAlertList);
    yield put({ type: GET_ALERT_LIST_SUCCESS, alerts });
  } catch (err) {
    console.log(err);
  }
}

async function fetchAlertList() {
  try {
    const alerts = (await http.instance.get("/user/alerts")).data;
    return alerts;
  } catch(err) {
    throw new Error(err);
  }
}

const listSaga = [
  takeLatest(
    GET_ALERT_LIST,
    getAlertList
  ),
]

export default listSaga;