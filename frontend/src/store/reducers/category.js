import * as actionTypes from '../actions/actionTypes';

const initialState = {
  categories: null,
  selectedCategory: null,
  isFetching: false,
  error: null,
};

export const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORIES_START:
      return { ...state, isFetching: true };

    case actionTypes.FETCH_CATEGORIES_FAIL:
      return { ...state, isFetching: false, error: action.payload };

    case actionTypes.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        isFetching: false,
        error: null,
      };

    case actionTypes.SELECT_CATEGORY:
      return { ...state, selectedCategory: action.payload };

    default:
      return state;
  }
};
