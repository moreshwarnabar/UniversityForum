import { NETWORK_ERROR, ON_HIDE } from '../actionTypes';

export const networkError = () => ({
  type: NETWORK_ERROR,
});

export const onHide = () => ({
  type: ON_HIDE,
});
