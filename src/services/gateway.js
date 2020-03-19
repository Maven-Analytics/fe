import Axios from 'axios';

import accessConfig from '#root/utils/accessConfig';

const GATEWAY_URL = accessConfig('HOST_PUBLIC_GATEWAY');

const gatewayService = async ({query}) => {
  const res = await Axios.post(`${GATEWAY_URL}/graphql`, {query});

  return res.data;
};

export default gatewayService;
