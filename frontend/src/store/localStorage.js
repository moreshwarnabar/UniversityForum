export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (error) {
    console.log(error);
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    return !serializedState ? undefined : JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};
