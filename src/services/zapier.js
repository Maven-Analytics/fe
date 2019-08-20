import axios from 'axios';

export default (hook, data) => {
  return axios({
    method: 'GET',
    url: hook,
    params: data
  })
    .then(res => res.data);
};
