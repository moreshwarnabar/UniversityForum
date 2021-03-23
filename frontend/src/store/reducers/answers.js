import * as actionTypes from '../actions/actionTypes';

const initialState = {
  answers: [],
  isFetching: false,
  error: null,
};

export const answersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ANSWERS_START:
      return { ...state, isFetching: true };

    case actionTypes.FETCH_ANSWERS_FAIL:
      return { ...state, isFetching: false, error: action.payload };

    case actionTypes.FETCH_ANSWERS_SUCCESS:
      return {
        ...state,
        answers: action.payload,
        isFetching: false,
        error: null,
      };

    case actionTypes.POST_ANSWER_FAIL:
      return { ...state, error: action.payload, isFetching: false };

    case actionTypes.POST_ANSWER_SUCCESS:
      const updatedAnswers = [...state.answers];
      updatedAnswers.unshift(action.payload);

      return { ...state, isFetching: false, answers: updatedAnswers };

    case actionTypes.REPORT_ANSWER_FAIL:
      return { ...state, error: action.payload, isFetching: false };

    case actionTypes.REPORT_ANSWER_SUCCESS:
      const reportedAnswers = updateAnswer([...state.answers], action.payload);

      return { ...state, isFetching: false, answers: reportedAnswers }; 

    default:
      return state;
  }
};

const updateAnswer = (answers, updatedAnswer) => {
  const answerIndex = answers.findIndex(
    answer => answer.id === updatedAnswer.id
  );
  answers[answerIndex] = updatedAnswer;
  return answers;
};
