export interface Record {
  id: string,
  artist: string,
  title: string,
  cover: string,
  loading: boolean,
  loaded: boolean,
}

export const DefaultRecordState: Record = {
  id: undefined,
  artist: undefined,
  title: undefined,
  cover: undefined,
  loading: false,
  loaded: false,
}