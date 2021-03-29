export interface User {
  _id: string,
  email: string,
  username: string,
  loading: boolean,
  loaded: boolean,
  phone: string,
  discogs: {
    username?: string,
    token?: string,
    tokenSecret?: string,
  }
}

export const DefaultUserState: User = {
  _id: undefined,
  email: undefined,
  username: undefined,
  loading: false,
  loaded: false,
  phone: undefined,
  discogs: {}
}