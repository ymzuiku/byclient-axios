import Axios, { AxiosRequestConfig } from 'axios';
import NodeRSA from 'node-rsa';

export interface IParams {
  url: string;
  RSAKey?: string;
  checkKey?: string;
  bit?: number;
  config?: AxiosRequestConfig;
  encryptionScheme?: 'pkcs1' | 'pkcs1_oaep';
}

export const ByClientAxios = (params: IParams) => {
  const { bit = 1024, encryptionScheme = 'pkcs1', url, RSAKey: keys, config = {}, checkKey } = params;

  const rsa = new NodeRSA({ b: bit });
  rsa.setOptions({ encryptionScheme });
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
