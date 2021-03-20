import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isRegisteringUser: false,
  isSending: false,
  isSuccess: false,
  errors: null,
};

export const userRegistrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_USER_FORM:
      return { ...state, isRegisteringUser: true };

    case actionTypes.RESET_USER_FORM:
      return { ...state, errors: null };

    case actionTypes.USER_REGISTRATION_START:
      return { ...state, isSending: true };

    case actionTypes.USER_REGISTRATION_FAIL:
      return { ...state, errors: action.payload };

    case actionTypes.USER_REGISTRATION_SUCCESS:
      return { ...state, isSuccess: true, isRegisteringUser: false };

    default:
      return state;
  }
};
