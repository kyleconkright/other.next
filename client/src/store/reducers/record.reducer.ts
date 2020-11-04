import { GET_RECORD, GET_RECORD_FAILURE, GET_RECORD_SUCCESS } from "../actions/record.actions";
import { DefaultRecordState } from "../../models/record";

function recordReducer(state = DefaultRecordState, action) {
  const { type, error, ...data } = action;
  console.log(action);
  switch (type) {
    case GET_RECORD:
      return {
        ...state,
        loading: true
      }
    case GET_RECORD_SUCCESS:
      return {
        ...state,
        ...data.record,
        loading: false
      }
    case GET_RECORD_FAILURE:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}

export default recordReducer;