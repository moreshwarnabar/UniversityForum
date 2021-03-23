import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isCreatingCategory: false,
  isFetching: false,
  isSuccess: false,
  errors: null,
};

export const categoryCreationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_CATEGORY_FORM:
      return { ...state, isCreatingCategory: true };

    case actionTypes.HIDE_CATEGORY_FORM:
      return { ...state, isCreatingCategory: false, errors: null };

    case actionTypes.RESET_CATEGORY_FORM:
      return { ...state, errors: null };

    case actionTypes.CATEGORY_CREATION_START:
      return { ...state, isFetching: true };

    case actionTypes.CATEGORY_CREATION_FAIL:
      return {
        ...state,
        errors: action.payload,
        isFetching: false,
        isSuccess: false,
      };

    case actionTypes.CATEGORY_CREATION_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        isCreatingCategory: false,
        isFetching: false,
      };

    default:
      return state;
  }
};
