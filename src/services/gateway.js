import Axios from 'axios';

import {env} from '#root/constants';

const GATEWAY_URL = env.HOST_PUBLIC_GATEWAY;

const gatewayService = async ({query}) => {
  const res = await Axios.post(`${GATEWAY_URL}/graphql`, {query});

  return res.data;
};

export default gatewayService;
