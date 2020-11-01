export const CHECK_FOR_LOGGED_IN_USER = '[USER] Check For Logged In User';
export const USER_LOGIN = '[USER] Login';
export const USER_LOGIN_SUCCESS = '[USER] Login Success';
export const USER_LOGOUT = '[USER] Logout';
export const USER_LOGOUT_SUCCESS = '[USER] Logout Success';
export const SET_USER = '[USER] Set User';
export const USER_UPDATE = '[USER] Update User';

export function checkForLoggedInUser() {
  return { type: CHECK_FOR_LOGGED_IN_USER }
}

export function userLogin(user) {
  return { type: USER_LOGIN, user }
}

export function userLogout() {
  return { type: USER_LOGOUT }
}

export function userLogoutSuccess() {
  return { type: USER_LOGOUT_SUCCESS }
}

export function userLoginSuccess(user) {
  return { type: USER_LOGIN_SUCCESS, user }
}

export function setUser(user) {
  console.log(user);
  return { type: SET_USER, user}
}

export function userUpdate(user) {
  return { type: USER_UPDATE, user }
}