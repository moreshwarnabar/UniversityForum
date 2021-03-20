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
