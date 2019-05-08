import {combineReducers} from 'redux-immutable';
import loading from './loading';
import error from './error';
import response from './response';
import user from './user';

const Ducks = combineReducers({
  loading,
  error,
  response,
  user
});

export default Ducks;
