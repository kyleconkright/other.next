import { GET_ALERT_LIST_SUCCESS, SET_ALERT_LIST } from "../actions/list.actions";

function listReducer(state = { alerts:{}}, action) {
  const { type, error, ...data } = action;
  const alerts = data.alerts?.reduce((acc, item) => {
    return ({
      ...acc,
      [item._id]: {
        ...item
      }
    })
  }, {});
  switch (type) {
    case GET_ALERT_LIST_SUCCESS:
      return {
        ...state,
          alerts: {
            ...state.alerts,
            ...alerts,
        },
        loading: true
      }
    default:
      return state;
  }
}

export default listReducer;