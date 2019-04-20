// Import Router from 'next/router';
import axios from 'axios';

import actions from '../redux_old/actions';
import {getCookie} from './cookies';

export default async function (ctx) {
  if (ctx.isServer) {
    if (ctx.req.headers.cookie) {
      const data = await reauthenticate(getCookie('token', ctx.req));
      ctx.store.dispatch(actions.reauthenticate(data.token, data.user));
    }
  } else {
    // Const token = ctx.store.getState().auth.token;

    // If !token do some redirecting if needed
    // If (token && (ctx.pathname === '/signin' || ctx.pathname === '/signup')) {
    //   setTimeout(function () {
    //     Router.push('/');
    //   }, 0);
    // }
  }

  return ctx;
}

function reauthenticate(token) {
  return axios.get('http://localhost:3000/api/v1/me', {
    headers: {
      authorization: token
    }
  })
    .then(res => res.data)
    .then(response => response.data);
}
