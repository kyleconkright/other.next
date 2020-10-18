export interface User {
  email: string,
  username: string,
  discogs: {
    token?: string,
    tokenSecret?: string,
  }
}

export const DefaultUserState: User = {
  email: undefined,
  username: undefined,
  discogs: {}
}