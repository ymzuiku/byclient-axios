import { AxiosRequestConfig } from 'axios';
import { createRSA } from './createRSA';
export interface IParams {
    url: string;
    RSAKey?: string;
    checkKey?: string;
    config?: AxiosRequestConfig;
}
export { createRSA };
export declare const ByClientAxios: (params: IParams) => (data: any) => Promise<unknown>;
