import axios from 'axios';

import {getCookie} from '../utils/cookies';
import config from '../config';

const apiv2 = ({method = 'get', data = {}, params = {}, url = '', useAuth = true, token = getCookie('token') || ''}) => {
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

export default apiv2;

export const reauthenticateSync = async token => {
  return apiv2({
    url: '/me',
    token
  });
};
