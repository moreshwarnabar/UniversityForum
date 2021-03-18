import * as actionTypes from '../actions/actionTypes';
import * as paginationConfigs from '../../config/paginationConfigs';

const initialState = {
  users: null,
  toDisplay: null,
  pagination: {
    per: 1,
    current: 1,
    last: 1,
  },
  error: null,
  isUsersEmpty: false,
  isFetching: false,
};

export const listUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_START:
      return { ...state, isFetching: true };

    case actionTypes.FETCH_SUCCESS:
      const fetchedUsers = action.payload;
      const initPaginationResult = paginationConfigs.initPagination(
        fetchedUsers,
        state.pagination
      );

      return {
        ...state,
        users: fetchedUsers,
        ...initPaginationResult,
        isUsersEmpty: !fetchedUsers.length,
      };

    case actionTypes.FETCH_FAIL:
      return { ...state, isUsersEmpty: true, error: action.payload };

    case actionTypes.CHANGE_PAGE:
      const toDisplay = paginationConfigs.pageContentSlicer(
        state.users,
        action.payload,
        state.pagination.per
      );

      return {
        ...state,
        toDisplay,
        pagination: { ...state.pagination, current: action.payload },
      };

    case actionTypes.BLOCK_UNBLOCK_USER:
      const users = updateUser([...state.users], action.payload);
      const updatedToDisplay = updateUser([...state.toDisplay], action.payload);

      return { ...state, users, toDisplay: updatedToDisplay };

    default:
      return state;
  }
};

const updateUser = (users, updatedUser) => {
  const userIndex = users.findIndex(user => user.id === updatedUser.id);
  users[userIndex] = updatedUser;
  return users;
};
