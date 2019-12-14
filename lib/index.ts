import Axios, { AxiosRequestConfig } from 'axios';
import { createRSA } from './createRSA';

export interface IParams {
  url: string;
  keys?: string;
  config?: AxiosRequestConfig;
}

export { createRSA };

export const Lightning = (params: IParams) => {
  const { url, keys, config = {} } = params;
  const RSA = createRSA();
  if (keys) {
    RSA.init(keys);
  }

  const lightning = async (data: any) => {
    return new Promise(cb => {
      Axios.post(
        url,
        { code: RSA.encode(data) },
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

  return lightning;
};
