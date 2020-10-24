export interface Http {
  loading: boolean,
  error: null | {},
}

export const DefaultHttpState: Http = {
  loading: false,
  error: null,
}