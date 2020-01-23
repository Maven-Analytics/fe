import {fromJS} from 'immutable';
import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './ducks';
import rootSaga from './sagas';

const bindMiddleware = middleware => {
  // If (process.env.NODE_ENV !== 'production') {
  //   const {composeWithDevTools} = require('redux-devtools-extension');
  //   return composeWithDevTools(applyMiddleware(...middleware));
  // }

  return applyMiddleware(...middleware);
};

function configureStore(initialState = fromJS({})) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    initialState,
    bindMiddleware([sagaMiddleware])
  );

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
}

export default configureStore;
