import { NETWORK_ERROR, ON_HIDE } from '../actions/actionTypes';

const initialState = {
  isError: false,
  error: {
    title: 'Network Error',
    content: 'Unable to connect with the server. Please try again later',
  },
};

export const networkErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case NETWORK_ERROR:
      return { ...state, isError: true };

    case ON_HIDE:
      return { ...state, isError: false };

    default:
      return state;
  }
};
