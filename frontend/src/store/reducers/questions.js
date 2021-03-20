import * as actionTypes from '../actions/actionTypes';

const initialState = {
  questions: null,
  searchQuestions: null,
  isFetching: true,
  error: null,
};

export const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_QUESTIONS_START:
      return { ...state, isFetching: true };

    case actionTypes.FETCH_QUESTIONS_FAIL:
      return { ...state, isFetching: false, error: action.payload };

    case actionTypes.FETCH_QUESTIONS_SUCCESS:
      return { questions: action.payload, isFetching: false, error: null };

    case actionTypes.FETCH_SEARCH_FAIL:
      return { ...state, isFetching: false, error: action.payload };

    case actionTypes.FETCH_SEARCH_SUCCESS:
      return {
        ...state,
        searchQuestions: action.payload,
        isFetching: false,
        error: null,
      };

    case actionTypes.POST_QUESTION_FAIL:
      return { ...state, error: action.payload, isFetching: false };

    case actionTypes.POST_QUESTION_SUCCESS:
      const updatedQuestions = [...state.questions];
      console.log(action.payload);
      updatedQuestions.unshift(action.payload);
      return { ...state, isFetching: false, questions: updatedQuestions };

    default:
      return state;
  }
};
