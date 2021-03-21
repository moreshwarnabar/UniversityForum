import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  studentDetails: null,
  isFetching: false,
  error: null,
};

export const studentDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_STUDENT_START:
      return { ...state, isFetching: true };

    case actionTypes.FETCH_STUDENT_SUCCESS:
      return { ...state, studentDetails: action.payload, isFetching: false };

    case actionTypes.FETCH_STUDENT_FAIL:
      return { ...state, error: action.payload, isFetching: false };

    case actionTypes.UPDATE_STUDENT_START:
      return { ...state, isFetching: true };

    case actionTypes.UPDATE_STUDENT_SUCCESS:
      return { ...state, studentDetails: action.payload, isFetching: false };

    case actionTypes.UPDATE_STUDENT_FAIL:
      return { ...state, error: action.payload, isFetching: false };

    default:
      return state;
  }
};
