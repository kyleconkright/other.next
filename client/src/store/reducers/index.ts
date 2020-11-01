import { combineReducers } from 'redux'
import user from './user.reducer';
import { User, DefaultUserState } from '../../models/user';

export interface AppState {
  user: User,
}

export const DefaultAppState: AppState = {
  user: DefaultUserState,
}

export default combineReducers({
  user,
})