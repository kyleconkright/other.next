export const GET_RECORD = '[RECORD] Get Record'; 
export const GET_RECORD_SUCCESS = '[RECORD] Get Record Success'; 
export const GET_RECORD_FAILURE = '[RECORD] Get Record Failure'; 

export function getRecord(id) {
  return { type: GET_RECORD, id }
}