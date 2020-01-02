import {ApolloClient} from 'apollo-client';
import fetch from 'node-fetch';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

import accessConfig from '#root/utils/accessConfig';

export const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    credentials: 'include',
    url: accessConfig('HOST_GATEWAY') + '/graphql',
    fetch
  })
});

export default client;
