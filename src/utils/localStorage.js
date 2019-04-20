const STATE_KEY = 'state';

export const loadState = () => {
  try {
    let serializedState = localStorage.getItem(STATE_KEY);

    if (!serializedState) {
      return null;
    }

    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    let serializedState = JSON.stringify(state);
    localStorage.setItem(STATE_KEY, serializedState);
  } catch (error) {
    console.error('Error saving state.');
  }
};
