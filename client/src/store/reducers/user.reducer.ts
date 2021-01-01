import { USER_LOGIN, USER_LOGIN_SUCCESS, SET_USER, CHECK_FOR_LOGGED_IN_USER, USER_LOGOUT_SUCCESS, UPDATE_USER } from "../actions/user.actions";
import { DefaultUserState } from "../../models/user";


function userReducer(state = DefaultUserState, action: any) {
  const { type, ...user } = action;
  switch (type) {
    case CHECK_FOR_LOGGED_IN_USER:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN:
      return {
        ...state,
        emailVerified: false,
        emailSent: true,
      };
    case SET_USER:
      return {
        ...state,
        ...user,
        loading: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        ...user,
        loading: false,
      };
    case USER_LOGOUT_SUCCESS:
      return {
        ...user,
        loading: false,
      };
    default:
      return state;
  }
}

export default userReducer;