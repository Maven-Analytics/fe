import axios from 'axios';

import {getCookie} from '../utils/cookies';
import config from '../config';

export default ({method = 'get', data = {}, params = {}, url = '', useAuth = true}) => {
  const baseURL = config.HOST_APP;

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
