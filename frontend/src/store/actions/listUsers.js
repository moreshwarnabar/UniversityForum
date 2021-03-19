import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

const fetchUsersStart = () => ({
  type: actionTypes.FETCH_USERS_START,
});

const fetchUsersSuccess = data => ({
  type: actionTypes.FETCH_USERS_SUCCESS,
  payload: data,
});

const fetchUsersFail = errorMsg => ({
  type: actionTypes.FETCH_USERS_FAIL,
  payload: errorMsg,
});

export const fetchAllUsers = () => {
  return dispatch => {
    dispatch(fetchUsersStart());
    axios
      .get('users/all')
      .then(response => dispatch(fetchUsersSuccess(response.data.result)))
      .catch(({ response }) => dispatch(fetchUsersFail(response.data)));
  };
};

export const fetchFilteredUsers = search => {
  return dispatch => {
    dispatch(fetchUsersStart());
    axios
      .get(`users${search === '' ? '/all' : `/filters?${search}`}`)
      .then(response => dispatch(fetchUsersSuccess(response.data.result)))
      .catch(({ response }) => dispatch(fetchUsersFail(response.data)));
  };
};

export const changeUsersPage = page => ({
  type: actionTypes.CHANGE_USERS_PAGE,
  payload: page,
});

const blockUnblockUser = user => ({
  type: actionTypes.BLOCK_UNBLOCK_USER,
  payload: user,
});

export const aysncBlockUnblockUser = user => {
  return dispatch => {
    dispatch(fetchUsersStart());
    axios
      .put('users', user)
      .then(response => {
        dispatch(blockUnblockUser(response.data.result));
      })
      .catch(({ response }) => dispatch(fetchUsersFail(response.data)));
  };
};
