import { AxiosRequestConfig } from 'axios';
export interface IParams {
    url: string;
    RSAKey?: string;
    checkKey?: string;
    bit?: number;
    config?: AxiosRequestConfig;
    encryptionScheme?: 'pkcs1' | 'pkcs1_oaep';
}
export declare const ByClientAxios: (params: IParams) => (data: any) => Promise<unknown>;
