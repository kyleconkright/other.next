export interface User {
  email: string,
  username: string,
  discogs: {
    username?: string,
    token?: string,
    tokenSecret?: string,
  }
}

export const DefaultUserState: User = {
  email: undefined,
  username: undefined,
  discogs: {}
}