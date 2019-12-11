import axios from 'axios';

import {getCookie} from '../utils/cookies';
import config from '../config';
import {canUseDOM} from '../utils/componentHelpers';

export default ({method = 'get', data = {}, params = {}, url = '', useAuth = true, token = getCookie('token') || ''}) => {
  const baseURL = canUseDOM() ? window.location.origin : 'http://localhost:5000';

  return axios({
    baseURL,
    method,
    data,
    params,
    url,
    headers: {
      authorization: useAuth ? token : ''
    }
  }).then(res => res.data.data);
};
