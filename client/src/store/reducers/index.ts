import { combineReducers } from 'redux'
import user from './user.reducer';
import record from './record.reducer';
import { User, DefaultUserState } from '../../models/user';
import { Record, DefaultRecordState } from '../../models/record';

export interface AppState {
  user: User,
  record: Record,
}

export const DefaultAppState: AppState = {
  user: DefaultUserState,
  record: DefaultRecordState
}

export default combineReducers({
  user,
  record,
})