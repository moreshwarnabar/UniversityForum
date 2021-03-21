import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  error: null,
  isLoggedIn: false,
  isFetching: false,
};

export const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER_START:
      return { ...state, isFetching: true };

    case actionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isFetching: false,
        isLoggedIn: true,
      };

    case actionTypes.LOGIN_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
        isLoggedIn: false,
      };

    case actionTypes.LOGOUT_USER:
      return { user: null, error: null, isLoggedIn: false };

    case actionTypes.UPDATE_USER_START:
      return { ...state, isFetching: true };

    case actionTypes.UPDATE_USER_SUCCESS:
      return { ...state, error: null, user: action.payload, isFetching: false };

    case actionTypes.UPDATE_USER_FAIL:
      return { ...state, error: action.payload, isFetching: false };

    default:
      return state;
  }
};
