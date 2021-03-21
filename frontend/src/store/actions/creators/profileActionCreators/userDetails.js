import * as actionTypes from '../../actionTypes';
import axios from '../../../../axios-base';

const updateUserStart = () => ({
  type: actionTypes.UPDATE_USER_START,
});

const updateUserSuccess = data => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
  payload: data,
});

const updateUserFail = error => ({
  type: actionTypes.UPDATE_USER_FAIL,
  payload: error,
});

export const updateUser = data => {
  return dispatch => {
    dispatch(updateUserStart());
    axios
      .put('users', data)
      .then(response => dispatch(updateUserSuccess(response.data.result)))
      .catch(error => dispatch(updateUserFail(error.response)));
  };
};

const updatePasswordStart = () => ({
  type: actionTypes.UPDATE_PASSWORD_START,
});

const updatePasswordSuccess = data => ({
  type: actionTypes.UPDATE_PASSWORD_SUCCESS,
  payload: data,
});

const updatePasswordFail = error => ({
  type: actionTypes.UPDATE_PASSWORD_FAIL,
  payload: error,
});

export const updatePassword = (id, password) => {
  return dispatch => {
    dispatch(updatePasswordStart());
    axios
      .put(`users/password/${id}`, password)
      .then(response => dispatch(updatePasswordSuccess(response.data.result)))
      .catch(error => dispatch(updatePasswordFail(error.response)));
  };
};
