import { User, DefaultUserState } from './../models/user';

function userReducer(state, action): User {
  const { type, ...user } = action;
  switch (type) {
    case 'SET': {
      return {
        ...state,
        ...user,
      }
    }
    default: {
      throw new Error('Should not happen');
    }
  }
}

export default userReducer;