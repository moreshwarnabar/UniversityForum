import * as actionTypes from '../actionTypes';
import { networkError } from './networkError';
import axios from '../../../axios-base';

const categoryCreationStart = () => ({
  type: actionTypes.CATEGORY_CREATION_START,
  payload: true,
});

const categoryCreationSuccess = () => ({
  type: actionTypes.CATEGORY_CREATION_SUCCESS,
});

const categoryCreationFail = errorMsg => ({
  type: actionTypes.CATEGORY_CREATION_FAIL,
  payload: errorMsg,
});

export const showCategoryForm = () => ({
  type: actionTypes.SHOW_CATEGORY_FORM,
});

export const hideCategoryForm = () => ({
  type: actionTypes.HIDE_CATEGORY_FORM,
});

export const resetCategoryForm = () => ({
  type: actionTypes.RESET_CATEGORY_FORM,
});

export const categoryCreation = data => {
  return dispatch => {
    dispatch(categoryCreationStart());
    axios
      .post('category', data)
      .then(response => {
        dispatch(categoryCreationSuccess());
      })
      .catch(error => {
        if (!error.response) dispatch(networkError());
        dispatch(categoryCreationFail(error.response));
      });
  };
};
