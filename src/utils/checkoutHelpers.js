import api from '../services/api';
import {getCookie} from './cookies';

export const getCheckoutUrlAsync = async ctx => {
  const token = getCookie('token', ctx);
  const checkout = getCookie('checkout', ctx);
  const planId = checkout && checkout.plan ? checkout.plan.id : 1;

  const data = await api({
    method: 'GET',
    url: '/api/v1/checkout/redirect',
    token,
    params: {
      planId
    }
  });

  return data.checkoutUrl;
};
