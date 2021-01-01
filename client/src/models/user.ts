export interface User {
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
  email: undefined,
  username: undefined,
  loading: false,
  loaded: false,
  phone: undefined,
  discogs: {}
}