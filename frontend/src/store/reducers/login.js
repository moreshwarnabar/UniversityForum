import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  error: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER_SUCCESS:
      return { ...state, user: action.payload };

    case actionTypes.LOGIN_USER_FAIL:
      return { ...state, error: action.payload };

    default:
      console.log('in default');
      return state;
  }
};
