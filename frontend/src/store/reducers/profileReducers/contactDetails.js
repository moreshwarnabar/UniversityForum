import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  contactDetails: null,
  isFetching: false,
  error: null,
};

export const contactDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CONTACT_START:
      return { ...state, isFetching: true };

    case actionTypes.FETCH_CONTACT_SUCCESS:
      return { ...state, contactDetails: action.payload, isFetching: false };

    case actionTypes.FETCH_CONTACT_FAIL:
      return { contactDetails: null, error: action.payload, isFetching: false };

    case actionTypes.UPDATE_CONTACT_START:
      return { ...state, isFetching: true };

    case actionTypes.UPDATE_CONTACT_SUCCESS:
      return { ...state, contactDetails: action.payload, isFetching: false };

    case actionTypes.UPDATE_CONTACT_FAIL:
      return { ...state, error: action.payload, isFetching: false };

    default:
      return state;
  }
};
