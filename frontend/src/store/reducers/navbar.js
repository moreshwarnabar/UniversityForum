import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isOpen: false,
};

export const navbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_DROPDOWN:
      console.log(state.isOpen);
      return { isOpen: !state.isOpen };

    default:
      return state;
  }
};
