import * as actionTypes from '../actionTypes';
import axios from '../../../axios-base';

const loginUserSuccess = user => {
  return {
    type: actionTypes.LOGIN_USER_SUCCESS,
    payload: user,
  };
};

const loginUserFail = errorMsg => {
  return {
    type: actionTypes.LOGIN_USER_FAIL,
    payload: errorMsg,
  };
};

export const authenticateUser = loginData => {
  return dispatch => {
    const { username, password } = loginData;
    axios
      .get(`users/single/${username}/${password}`)
      .then(response => {
        const user = response.data.result;
        dispatch(loginUserSuccess(user));
      })
      .catch(error => {
        dispatch(loginUserFail(error.response));
      });
  };
};

export const logoutUser = () => ({
  type: actionTypes.LOGOUT_USER,
});
