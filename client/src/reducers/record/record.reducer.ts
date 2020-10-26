// import { User, DefaultUserState } from './../models/user';

function recordReducer(state, action) {
  const { type, ...record } = action;
  switch (type) {
    case 'SET_CURRENT_RECORD': {
      return {
        ...state,
        ...record,
      }
    }
    default: {
      throw new Error('Should not happen');
    }
  }
}

export default recordReducer;