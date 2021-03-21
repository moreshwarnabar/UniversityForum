import * as actionTypes from '../actions/actionTypes';

const initialState = {
  questions: [],
  searchQuestions: null,
  currentCategory: null,
  selectedQuestion: null,
  isCatFetching: false,
  isSearchFetching: false,
  error: null,
};

export const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_QUESTIONS_START:
      return { ...state, [action.payload]: true };

    case actionTypes.FETCH_QUESTIONS_FAIL:
      return { ...state, isCatFetching: false, error: action.payload };

    case actionTypes.FETCH_QUESTIONS_SUCCESS:
      const currentCategory = action.payload.id;
      return {
        ...state,
        questions: action.payload.data,
        currentCategory,
        isCatFetching: false,
        error: null,
      };

    case actionTypes.FETCH_SEARCH_FAIL:
      return { ...state, isSearchFetching: false, error: action.payload };

    case actionTypes.FETCH_SEARCH_SUCCESS:
      return {
        ...state,
        searchQuestions: action.payload,
        isSearchFetching: false,
        error: null,
      };

    case actionTypes.POST_QUESTION_FAIL:
      return { ...state, error: action.payload, isCatFetching: false };

    case actionTypes.POST_QUESTION_SUCCESS:
      const updatedQuestions = [...state.questions];
      console.log(action.payload);
      updatedQuestions.unshift(action.payload);
      return { ...state, isCatFetching: false, questions: updatedQuestions };

    case actionTypes.SELECT_QUESTION:
      return { ...state, selectedQuestion: action.payload };

    default:
      return state;
  }
};
