import Axios, { AxiosRequestConfig } from 'axios';
import { createRSA } from './createRSA';

export interface IParams {
  url: string;
  RSAKey?: string;
  checkKey?: string;
  config?: AxiosRequestConfig;
}

export { createRSA };

export const ByClientAxios = (params: IParams) => {
  const { url, RSAKey: keys, config = {}, checkKey } = params;
  const RSA = createRSA();
  if (keys) {
    RSA.init(keys);
  }

  const client = async (data: any) => {
    return new Promise(cb => {
      Axios.post(
        url,
        { code: RSA.encode({ ...data, _checkTime: Date.now(), _checkKey: checkKey }) },
        {
          ...config,
          headers: { 'content-type': 'application/json', ...config.headers },
        },
      )
        .then(res => {
          if (res.data) {
            if (res.data.code) {
              return cb(RSA.decode(res.data.code));
            }
            return cb(res.data);
          }
          return res;
        })
        .catch(err => cb(err.response ? err.response.data : err));
    });
  };

  return client;
};
