import axios from 'axios';
import accessConfig from '#root/utils/accessConfig';

const HOST_PUBLIC_GATEWAY = accessConfig('HOST_PUBLIC_GATEWAY');

export default class GatewayService {
  static async uploadAvatar(file) {
    const formData = new window.FormData();
    formData.append('file', file);

    const res = await axios.post(`${HOST_PUBLIC_GATEWAY}/v1/avatar`, formData, {
      withCredentials: true
    });

    return res.data;
  }
}
