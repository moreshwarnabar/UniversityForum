import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  facultyDetails: null,
  isFetching: false,
  error: null,
};

export const facultyDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_FACULTY_START:
      return { ...state, isFetching: true };

    case actionTypes.FETCH_FACULTY_SUCCESS:
      return { ...state, facultyDetails: action.payload, isFetching: false };

    case actionTypes.FETCH_FACULTY_FAIL:
      return { ...state, error: action.payload, isFetching: false };

    case actionTypes.UPDATE_FACULTY_START:
      return { ...state, isFetching: true };

    case actionTypes.UPDATE_FACULTY_SUCCESS:
      return { ...state, facultyDetails: action.payload, isFetching: false };

    case actionTypes.UPDATE_FACULTY_FAIL:
      return { ...state, error: action.payload, isFetching: false };

    default:
      return state;
  }
};
