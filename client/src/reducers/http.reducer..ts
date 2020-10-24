import { DefaultHttpState, Http } from './../models/http';

function httpReducer(state, action): Http {
  const { payload, type } = action;
  console.log(action);
  switch (type) {
    case 'SEND': {
      return {
        error: null,
        loading: true,
      }
    }
    case 'RESPONSE': {
      return {
        error: null,
        loading: false,
      }
    }
    case 'ERROR': {
      return {
        loading: false,
        error: payload,
      }
    }
    default: {
      throw new Error('Should not happen');
    }
  }
}

export default httpReducer;