import * as actionTypes from '../actionTypes';
import axios from '../../../axios-base';

const userRegistrationStart = () => ({
  type: actionTypes.USER_REGISTRATION_START,
  payload: true,
});

const userRegistrationSuccess = () => ({
  type: actionTypes.USER_REGISTRATION_SUCCESS,
});

const userRegistrationFail = errorMsg => ({
  type: actionTypes.USER_REGISTRATION_FAIL,
  payload: errorMsg,
});

export const showUserForm = () => ({
  type: actionTypes.SHOW_USER_FORM,
});

export const hideUserForm = () => ({
  type: actionTypes.HIDE_USER_FORM,
});

export const resetUserForm = () => ({
  type: actionTypes.RESET_USER_FORM,
});

export const userRegistration = data => {
  return dispatch => {
    dispatch(userRegistrationStart());
    axios
      .post('users', data)
      .then(response => {
        dispatch(userRegistrationSuccess());
      })
      .catch(error => {
        dispatch(userRegistrationFail(error.response));
      });
  };
};
