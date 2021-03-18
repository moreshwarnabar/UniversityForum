import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

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

export const resetForm = () => ({
  type: actionTypes.RESET_FORM,
});

export const userRegistration = data => {
  return dispatch => {
    dispatch(userRegistrationStart());
    axios
      .post('http://localhost:8080/forum/users', data)
      .then(response => {
        dispatch(userRegistrationSuccess());
      })
      .catch(({ response }) => {
        console.log(response);
        dispatch(userRegistrationFail(response.data.errorDetails));
      });
  };
};
