import * as actionTypes from '../actionTypes';
import axios from '../../../axios-base';

const fetchAnswersStart = () => ({
  type: actionTypes.FETCH_ANSWERS_START,
});

const fetchAnswersFail = error => ({
  type: actionTypes.FETCH_ANSWERS_FAIL,
  payload: error,
});

const fetchAnswersSuccess = data => ({
  type: actionTypes.FETCH_ANSWERS_SUCCESS,
  payload: data,
});

export const fetchAnswers = id => {
  return dispatch => {
    dispatch(fetchAnswersStart());
    axios
      .get(`answers/question/${id}`)
      .then(response => dispatch(fetchAnswersSuccess(response.data.result)))
      .catch(error => dispatch(fetchAnswersFail(error.response)));
  };
};

const postAnswerSuccess = data => ({
  type: actionTypes.POST_ANSWER_SUCCESS,
  payload: data,
});

const postAnswerFail = error => ({
  type: actionTypes.POST_ANSWER_FAIL,
  payload: error,
});

export const postAnswer = data => {
  return dispatch => {
    dispatch(fetchAnswersStart());
    axios
      .post('answers', data)
      .then(response => dispatch(postAnswerSuccess(response.data.result)))
      .catch(error => dispatch(postAnswerFail(error.response)));
  };
};

const reportAnswerSuccess = data => ({
  type: actionTypes.REPORT_ANSWER_SUCCESS,
  payload: data,
});

const reportAnswerFail = error => ({
  type: actionTypes.REPORT_ANSWER_FAIL,
  payload: error,
});

export const reportAnswer = data => {
  return dispatch => {
    dispatch(fetchAnswersStart());
    axios
      .put(`answers/report/add`, data)
      .then(response => dispatch(reportAnswerSuccess(response.data.result)))
      .catch(error => dispatch(reportAnswerFail(error.response)));
  };
};
