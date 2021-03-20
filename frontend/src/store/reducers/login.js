import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  error: null,
  isLoggedIn: false,
};

export const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER_SUCCESS:
      return { ...state, user: action.payload, isLoggedIn: true };

    case actionTypes.LOGIN_USER_FAIL:
      return { ...state, error: action.payload, isLoggedIn: false };

    case actionTypes.LOGOUT_USER:
      return { user: null, error: null, isLoggedIn: false };

    default:
      return state;
  }
};
