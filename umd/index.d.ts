import { AxiosRequestConfig } from 'axios';
import { createRSA } from './createRSA';
export interface IParams {
    url: string;
    RSAKey?: string;
    checkKey?: string;
    config?: AxiosRequestConfig;
}
export { createRSA };
export declare const Lightning: (params: IParams) => (data: any) => Promise<unknown>;
