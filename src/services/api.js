import axios from 'axios';

import {getCookie} from '../utils/cookies';
import config from '../config';
import {canUseDOM} from '../utils/componentHelpers';

export default ({method = 'get', data = {}, params = {}, url = '', useAuth = true}) => {
  const baseURL = canUseDOM() ? config.HOST_APP : config.HOST_SERVER;

  return axios({
    baseURL,
    method,
    data,
    params,
    url,
    headers: {
      authorization: useAuth ? getCookie('token') || '' : ''
    }
  }).then(res => res.data.data);
};
