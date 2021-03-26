import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  isFetching: false,
  errror: null,
  message: null,
};

export const userDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_PASSWORD_START:
      return { ...state, isFetching: true };

    case actionTypes.UPDATE_PASSWORD_SUCCESS:
      return { message: action.payload, error: null, isFetching: false };

    case actionTypes.UPDATE_PASSWORD_FAIL:
      return { ...state, error: action.payload, isFetching: false };

    default:
      return state;
  }
};
