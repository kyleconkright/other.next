import axios from 'axios';
import { takeLatest, call, put } from 'redux-saga/effects';

import { GET_RECORD, GET_RECORD_SUCCESS } from '../actions/record.actions';


function* getRecord(action) {
  try {
    const {id} = action;
    const record = yield call(fetchRecordFromServer, id);
    yield put({ type: GET_RECORD_SUCCESS, record });
  } catch (err) {
    console.log(err);
  }
}

async function fetchRecordFromServer(id) {
  try {
   const { data: record } = await axios.get(`process.env.NEXT_PUBLIC_API_URL/discogs/release/${id}`);
   return record
  } catch(err) {
    throw new Error(err);
  }
}

const recordSaga = [
  takeLatest(
    GET_RECORD,
    getRecord
  ),
]

export default recordSaga;