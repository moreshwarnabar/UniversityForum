import * as actionTypes from '../../actionTypes';
import axios from '../../../../axios-base';

const fetchStudentStart = () => ({
  type: actionTypes.FETCH_STUDENT_START,
});

const fetchStudentSuccess = data => ({
  type: actionTypes.FETCH_STUDENT_SUCCESS,
  payload: data,
});

const fetchStudentFail = error => ({
  type: actionTypes.FETCH_STUDENT_FAIL,
  payload: error,
});

export const fetchStudent = id => {
  return dispatch => {
    dispatch(fetchStudentStart());
    axios
      .get(`students/${id}`)
      .then(response => dispatch(fetchStudentSuccess(response.data.result)))
      .catch(error => dispatch(fetchStudentFail(error.response)));
  };
};

const updateStudentStart = () => ({
  type: actionTypes.UPDATE_STUDENT_START,
});

const updateStudentSuccess = data => ({
  type: actionTypes.UPDATE_STUDENT_SUCCESS,
  payload: data,
});

const updateStudentFail = error => ({
  type: actionTypes.UPDATE_STUDENT_FAIL,
  payload: error,
});

export const updateStudent = data => {
  return dispatch => {
    dispatch(updateStudentStart());
    axios
      .put('students', data)
      .then(response => dispatch(updateStudentSuccess(response.data.result)))
      .catch(error => dispatch(updateStudentFail(error.response)));
  };
};

export const createStudent = (id, data) => {
  return dispatch => {
    dispatch(updateStudentStart());
    axios
      .post(`students/${id}`, data)
      .then(response => dispatch(updateStudentSuccess(response.data.result)))
      .catch(error => dispatch(updateStudentFail(error.response)));
  };
};
