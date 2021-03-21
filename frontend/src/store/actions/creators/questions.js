import * as actionTypes from '../actionTypes';
import axios from '../../../axios-base';

const fetchQuestionsStart = () => ({
  type: actionTypes.FETCH_QUESTIONS_START,
});

const fetchQuestionsFail = error => ({
  type: actionTypes.FETCH_QUESTIONS_FAIL,
  payload: error,
});

const fetchQuestionsSuccess = (data, id) => ({
  type: actionTypes.FETCH_QUESTIONS_SUCCESS,
  payload: { data, id },
});

export const fetchQuestions = id => {
  return dispatch => {
    dispatch(fetchQuestionsStart());
    axios
      .get(`questions/all/${id}`)
      .then(response =>
        dispatch(fetchQuestionsSuccess(response.data.result, id))
      )
      .catch(error => dispatch(fetchQuestionsFail(error.response)));
  };
};

const fetchSearchFail = error => ({
  type: actionTypes.FETCH_SEARCH_FAIL,
  payload: error,
});

const fetchSearchSuccess = data => ({
  type: actionTypes.FETCH_SEARCH_SUCCESS,
  payload: data,
});

export const fetchSearch = data => {
  return dispatch => {
    dispatch(fetchQuestionsStart());
    axios
      .get(`questions/filter/${data.search}/${data.id}`)
      .then(response => dispatch(fetchSearchSuccess(response.data.result)))
      .catch(error => dispatch(fetchSearchFail(error.response)));
  };
};

const postQuestionSuccess = data => ({
  type: actionTypes.POST_QUESTION_SUCCESS,
  payload: data,
});

const postQuestionFail = error => ({
  type: actionTypes.POST_QUESTION_FAIL,
  payload: error,
});

export const postQuestion = data => {
  return dispatch => {
    dispatch(fetchQuestionsStart());
    axios
      .post('questions', data)
      .then(response => dispatch(postQuestionSuccess(response.data.result)))
      .catch(error => dispatch(postQuestionFail(error.response)));
  };
};
