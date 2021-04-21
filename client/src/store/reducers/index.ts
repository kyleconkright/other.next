import { combineReducers } from 'redux'
import user from './user.reducer';
import record from './record.reducer';
import lists from './list.reducer';
import { User, DefaultUserState } from '../../models/user';
import { Record, DefaultRecordState } from '../../models/record';

export interface AppState {
  user: User,
  record: Record,
  lists: {alerts: {}},
}

export const DefaultAppState: AppState = {
  user: DefaultUserState,
  record: DefaultRecordState,
  lists: {alerts: {}}
}

export default combineReducers({
  user,
  record,
  lists,
})