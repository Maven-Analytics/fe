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

export const getCheckoutUrlAsync = async ctx => {
  const token = getCookie('token', ctx);
  const checkout = getCookie('checkout', ctx);
  const planId = checkout && checkout.plan ? checkout.plan.id : 1;

  const data = await apiv2({
    method: 'GET',
    url: '/public/checkout',
    token,
    params: {
      planId
    }
  });

  return data.checkoutUrl;
};
