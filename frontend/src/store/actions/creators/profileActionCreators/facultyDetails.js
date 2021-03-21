import * as actionTypes from '../../actionTypes';
import axios from '../../../../axios-base';

const fetchFacultyStart = () => ({
  type: actionTypes.FETCH_FACULTY_START,
});

const fetchFacultySuccess = data => ({
  type: actionTypes.FETCH_FACULTY_SUCCESS,
  payload: data,
});

const fetchFacultyFail = error => ({
  type: actionTypes.FETCH_FACULTY_FAIL,
  payload: error,
});

export const fetchFaculty = id => {
  return dispatch => {
    dispatch(fetchFacultyStart());
    axios
      .get(`faculty/${id}`)
      .then(response => dispatch(fetchFacultySuccess(response.data.result)))
      .catch(error => dispatch(fetchFacultyFail(error.response)));
  };
};

const updateFacultyStart = () => ({
  type: actionTypes.UPDATE_FACULTY_START,
});

const updateFacultySuccess = data => ({
  type: actionTypes.UPDATE_FACULTY_SUCCESS,
  payload: data,
});

const updateFacultyFail = error => ({
  type: actionTypes.UPDATE_FACULTY_FAIL,
  payload: error,
});

export const updateFaculty = data => {
  return dispatch => {
    dispatch(updateFacultyStart());
    axios
      .put('faculty', data)
      .then(response => dispatch(updateFacultySuccess(response.data.result)))
      .catch(error => dispatch(updateFacultyFail(error.response)));
  };
};

export const createFaculty = (id, data) => {
  return dispatch => {
    dispatch(updateFacultyStart());
    axios
      .post(`faculty/${id}`, data)
      .then(response => dispatch(updateFacultySuccess(response.data.result)))
      .catch(error => dispatch(updateFacultyFail(error.response)));
  };
};
