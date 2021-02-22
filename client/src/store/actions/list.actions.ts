export const GET_WANTLIST = '[WANTLIST] Get Wanlist'; 
export const GET_WANTLIST_SUCCESS = '[WANTLIST] Get Wanlist Success'; 
export const GET_WANTLIST_FAILURE = '[WANTLIST] Get Wanlist Failure'; 

export function getWanlist(userId) {
  return { type: GET_WANTLIST, userId }
}