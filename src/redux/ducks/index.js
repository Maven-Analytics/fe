import {combineReducers} from 'redux-immutable';
import loading from './loading';
import error from './error';
import response from './response';
import user from './user';
import state from './state';
import plans from './plans';
import checkout from './checkout';

const Ducks = combineReducers({
  loading,
  error,
  response,
  user,
  state,
  plans,
  checkout
});

export default Ducks;
