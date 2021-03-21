import * as actionTypes from '../../actionTypes';
import axios from '../../../../axios-base';

const fetchContactStart = () => ({
  type: actionTypes.FETCH_CONTACT_START,
});

const fetchContactSuccess = data => ({
  type: actionTypes.FETCH_CONTACT_SUCCESS,
  payload: data,
});

const fetchContactFail = error => ({
  type: actionTypes.FETCH_CONTACT_FAIL,
  payload: error,
});

export const fetchContact = id => {
  return dispatch => {
    dispatch(fetchContactStart());
    axios
      .get(`contacts/${id}`)
      .then(response => dispatch(fetchContactSuccess(response.data.result)))
      .catch(error => dispatch(fetchContactFail(error.response)));
  };
};

const updateContactStart = () => ({
  type: actionTypes.UPDATE_CONTACT_START,
});

const updateContactSuccess = data => ({
  type: actionTypes.UPDATE_CONTACT_SUCCESS,
  payload: data,
});

const updateContactFail = error => ({
  type: actionTypes.UPDATE_CONTACT_FAIL,
  payload: error,
});

export const updateContact = data => {
  return dispatch => {
    dispatch(updateContactStart());
    axios
      .put('contacts', data)
      .then(response => dispatch(updateContactSuccess(response.data.result)))
      .catch(error => dispatch(updateContactFail(error.response)));
  };
};
