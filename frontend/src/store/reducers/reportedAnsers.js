import * as actionTypes from '../actions/actionTypes';
import * as paginationConfigs from '../../config/paginationConfigs';

const initialState = {
  answers: null,
  toDisplay: null,
  pagination: {
    per: 1,
    current: 1,
    last: 1,
  },
  error: null,
  isAnswersEmpty: false,
  isFetching: false,
};

export const reportedAnswersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_REPORTS_START:
      return { ...state, isFetching: true };

    case actionTypes.FETCH_REPORTS_SUCCESS:
      const fetchedAnswers = action.payload;
      const initPaginationResult = paginationConfigs.initPagination(
        fetchedAnswers,
        state.pagination
      );

      return {
        ...state,
        answers: fetchedAnswers,
        ...initPaginationResult,
        isAnswersEmpty: !fetchedAnswers.length,
      };

    case actionTypes.FETCH_REPORTS_FAIL:
      return { ...state, isAnswersEmpty: true, error: action.payload };

    case actionTypes.REMOVE_REPORT_SUCCESS:
      const updatedAnswers = removeAnswer([...state.answers], action.payload);
      const remPaginationResult = paginationConfigs.initPagination(
        updatedAnswers,
        state.pagination
      );

      return {
        ...state,
        answers: updatedAnswers,
        ...remPaginationResult,
        isAnswersEmpty: !updatedAnswers.length,
      };

    case actionTypes.DELETE_ANSWER_SUCCESS:
      const afterDeletion = removeAnswer([...state.answers], action.payload);
      const delPaginationResult = paginationConfigs.initPagination(
        afterDeletion,
        state.pagination
      );

      return {
        ...state,
        answers: afterDeletion,
        ...delPaginationResult,
        isAnswersEmpty: !afterDeletion.length,
      };

    case actionTypes.CHANGE_ANSWERS_PAGE:
      const toDisplay = paginationConfigs.pageContentSlicer(
        state.answers,
        action.payload,
        state.pagination.per
      );

      return {
        ...state,
        toDisplay,
        pagination: { ...state.pagination, current: action.payload },
      };

    default:
      return state;
  }
};

const removeAnswer = (answers, updatedAnswer) => {
  const answerIndex = answers.findIndex(
    answer => answer.id === updatedAnswer.id
  );
  answers.splice(answerIndex, 1);
  return answers;
};
