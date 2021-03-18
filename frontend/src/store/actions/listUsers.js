import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

const fetchStart = () => ({
  type: actionTypes.FETCH_START,
});

const fetchSuccess = data => ({
  type: actionTypes.FETCH_SUCCESS,
  payload: data,
});

const fetchFail = errorMsg => ({
  type: actionTypes.FETCH_FAIL,
  payload: errorMsg,
});

export const fetchAllUsers = () => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get('users/all')
      .then(response => dispatch(fetchSuccess(response.data.result)))
      .catch(({ response }) => dispatch(fetchFail(response.data)));
  };
};

export const fetchFilteredUsers = search => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get(`users${search === '' ? '/all' : `/filters?${search}`}`)
      .then(response => dispatch(fetchSuccess(response.data.result)))
      .catch(({ response }) => dispatch(fetchFail(response.data)));
  };
};

export const changePage = page => ({
  type: actionTypes.CHANGE_PAGE,
  payload: page,
});

const blockUnblockUser = user => ({
  type: actionTypes.BLOCK_UNBLOCK_USER,
  payload: user,
});

export const aysncBlockUnblockUser = user => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('users', user)
      .then(response => {
        dispatch(blockUnblockUser(response.data.result));
      })
      .catch(({ response }) => dispatch(fetchFail(response.data)));
  };
};
