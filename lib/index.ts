import Axios, { AxiosRequestConfig } from 'axios';
import NodeRSA from 'node-rsa';

export interface IParams {
  url: string;
  RSAKey?: string;
  checkKey?: string;
  config?: AxiosRequestConfig;
}

export const ByClientAxios = (params: IParams) => {
  const { url, RSAKey: keys, config = {}, checkKey } = params;

  const rsa = new NodeRSA({ b: 1024 });
  rsa.setOptions({ encryptionScheme: 'pkcs1' });
  if (keys) {
    rsa.importKey(keys, 'private');
  }

  function encode(data: any) {
    if (keys) {
      return rsa.encryptPrivate(JSON.stringify(data), 'base64');
    }
    return data;
  }

  const client = async (data: any) => {
    return new Promise(cb => {
      Axios.post(
        url,
        { code: encode({ ...data, _checkTime: Date.now(), _checkKey: checkKey }) },
        {
          ...config,
          headers: { 'content-type': 'application/json', ...config.headers },
        },
      )
        .then((res: any) => {
          if (res.data) {
            return cb(res.data);
          }
          return res;
        })
        .catch((err: any) => cb(err.response ? err.response.data : err));
    });
  };

  return client;
};
