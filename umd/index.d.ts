import { AxiosRequestConfig } from 'axios';
export interface IParams {
    url: string;
    RSAKey?: string;
    checkKey?: string;
    config?: AxiosRequestConfig;
}
export declare const ByClientAxios: (params: IParams) => (data: any) => Promise<unknown>;
