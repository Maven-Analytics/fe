import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import cookie from 'cookie';
import fetch from 'isomorphic-unfetch';
import {createUploadLink} from 'apollo-upload-client';

import accessConfig from '#root/utils/accessConfig';

export const cache = new InMemoryCache();

function parseCookies(req, options = {}) {
  return cookie.parse(req ? req.headers.cookie || '' : typeof document === 'undefined' ? '' : document.cookie, options);
}

const client = ({ctx = {}, apolloState}) => {
  return new ApolloClient({
    cache: apolloState ? cache.restore(apolloState) : cache,
    ssrMode: typeof window === 'undefined',
    link: createUploadLink({
      credentials: 'include',
      uri: accessConfig('HOST_PUBLIC_GATEWAY') + '/graphql',
      fetch,
      headers: {
        cookie: 'session=' + parseCookies(ctx.req).session
      }
    })
  });
};

export default client;
