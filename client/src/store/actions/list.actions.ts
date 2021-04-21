export const GET_WANTLIST = '[WANTLIST] Get Wanlist'; 
export const GET_WANTLIST_SUCCESS = '[WANTLIST] Get Wanlist Success'; 
export const GET_WANTLIST_FAILURE = '[WANTLIST] Get Wanlist Failure'; 

export const GET_ALERT_LIST = '[ALERT LIST] Get Alert List';
export const GET_ALERT_LIST_SUCCESS = '[ALERT LIST] Get Alert List Success';
export const GET_ALERT_LIST_FAILURE = '[ALERT LIST] Get Alert List Failure';

export const SET_ALERT_LIST = '[ALERT LIST] Set Alert List';
export const SET_ALERT_LIST_SUCCESS = '[ALERT LIST] Set Alert List Success';
export const SET_ALERT_LIST_FAILURE = '[ALERT LIST] Set Alert List Failure';

export const GET_ALERT_LIST_ITEM = '[ALERT LIST] Get Alert List Item';
export const GET_ALERT_LIST_ITEM_SUCCESS = '[ALERT LIST] Get Alert List Item Success';
export const GET_ALERT_LIST_ITEM_FAILURE = '[ALERT LIST] Get Alert List Item Failure';

export function getWantlist(userId) {
  return { type: GET_WANTLIST, userId }
}

export function setAlertList(list: any[]) {
  return { type: SET_ALERT_LIST, list }
}

export function getAlertList(id: string) {
  return { type: GET_ALERT_LIST, id }
}

export function getAlertListItem(id: string) {
  return { type: GET_ALERT_LIST_ITEM, id }
}