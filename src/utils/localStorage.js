const STATE_KEY = 'state';

export const getItem = (key = STATE_KEY) => {
  try {
    if (!localStorage) {
      return undefined;
    }

    let serializedState = localStorage.getItem(key);

    if (!serializedState) {
      return null;
    }

    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const setItem = (key = STATE_KEY, state) => {
  try {
    let serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Error saving state.');
  }
};
