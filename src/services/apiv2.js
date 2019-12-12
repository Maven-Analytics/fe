import axios from 'axios';

import {getCookie} from '../utils/cookies';
import config from '../config';

export default ({method = 'get', data = {}, params = {}, url = '', useAuth = true, token = getCookie('token') || ''}) => {
  return axios({
    baseURL: `${config.HOST_PUBLIC_API}/v2`,
    method,
    data,
    params,
    url,
    headers: {
      authorization: useAuth ? token : ''
    }
  }).then(res => res.data);
};
