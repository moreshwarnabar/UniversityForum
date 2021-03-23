import * as actionTypes from '../actionTypes';
import { networkError } from './networkError';
import axios from '../../../axios-base';

const fetchCategoriesStart = () => ({
  type: actionTypes.FETCH_CATEGORIES_START,
});

const fetchCategoriesFail = error => ({
  type: actionTypes.FETCH_CATEGORIES_FAIL,
  payload: error,
});

const fetchCategoriesSuccess = data => ({
  type: actionTypes.FETCH_CATEGORIES_SUCCESS,
  payload: data,
});

export const fetchCategories = data => {
  return dispatch => {
    dispatch(fetchCategoriesStart());
    axios
      .get(`category/${data}`)
      .then(response => dispatch(fetchCategoriesSuccess(response.data.result)))
      .catch(error => {
        if (!error.response) dispatch(networkError());
        dispatch(fetchCategoriesFail(error.response));
      });
  };
};

export const selectCategory = categoryId => ({
  type: actionTypes.SELECT_CATEGORY,
  payload: categoryId,
});
