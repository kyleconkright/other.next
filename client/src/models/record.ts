export interface Record {
  id: string,
  artists: string[],
  title: string,
  cover: string,
  loading: boolean,
  loaded: boolean,
}

export const DefaultRecordState: Record = {
  id: undefined,
  artists: undefined,
  title: undefined,
  cover: undefined,
  loading: false,
  loaded: false,
}

export interface DiscogsOptions {
  condition: MediaCondition,
  sleeve_condition: MediaCondition,
  price: number,
}

export type MediaCondition = 'Mint' | 'Near Mint' | 'Very Good Plus' | 'Very Good' | 'Good Plus' | 'Good' | 'Fair' | 'Poor';

export const DiscogsMediaConditions = {
  'Mint':'Mint (M)',
  'Near Mint':'Near Mint (NM or M-)',
  'Very Good Plus':'Very Good Plus (VG+)',
  'Very Good':'Very Good (VG)',
  'Good Plus':'Good Plus (G+)',
  'Good':'Good (G)',
  'Fair':'Fair (F)',
  'Poor':'Poor (P)',
}

export function fromDiscogs(record) {
  return ({
    title: record.basic_information.artists[0].name + ' - ' + record.basic_information.title,
    imageUrl: record.basic_information.thumb,
    url: record.basic_information.resource_url,
    price: null
  })
}
