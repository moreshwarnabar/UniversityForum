import * as actionTypes from '../actionTypes';
import { networkError } from './networkError';
import axios from '../../../axios-base';

const fetchQuestionsStart = flag => ({
  type: actionTypes.FETCH_QUESTIONS_START,
  payload: flag,
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
    dispatch(fetchQuestionsStart('isCatFetching'));
    axios
      .get(`questions/all/${id}`)
      .then(response =>
        dispatch(fetchQuestionsSuccess(response.data.result, id))
      )
      .catch(error => {
        if (!error.response) dispatch(networkError());
        dispatch(fetchQuestionsFail(error.response));
      });
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
    dispatch(fetchQuestionsStart('isSearchFetching'));
    axios
      .get(`questions/filter/${data.search}/${data.id}`)
      .then(response => dispatch(fetchSearchSuccess(response.data.result)))
      .catch(error => {
        if (!error.response) dispatch(networkError());
        dispatch(fetchSearchFail(error.response));
      });
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
    dispatch(fetchQuestionsStart('isCatFetching'));
    axios
      .post('questions', data)
      .then(response => dispatch(postQuestionSuccess(response.data.result)))
      .catch(error => {
        if (!error.response) dispatch(networkError());
        dispatch(postQuestionFail(error.response));
      });
  };
};

export const selectQuestion = data => ({
  type: actionTypes.SELECT_QUESTION,
  payload: data,
});
