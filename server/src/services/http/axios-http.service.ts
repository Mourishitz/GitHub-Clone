import axios, { Axios, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import type { IHttpClient } from '@app/services/http/interfaces/http-client.interface';
import { HttpServiceException } from '@app/services/http/exceptions/HttpServiceException'

export class AxiosHttpService implements IHttpClient {
    private http: Axios;
    private baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.http = axios.create({
            baseURL: this.baseUrl,
        });
    }

    async get(endpoint: string, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any>> {
        try {
            return this.http.get(endpoint, config).then((data) => data);
        } catch (error) {
            throw this.handle(error as Error);
        }
    }

    async post(endpoint: string, data?: any, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any>> {
        try {
            return this.http.post(endpoint, data, config).then((data) => data);
        } catch (error) {
            throw this.handle(error as Error);
        }
    }

    async put(endpoint: string, data?: any, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any>> {
        try {
            return this.http.put(endpoint, data, config).then((data) => data);
        } catch (error) {
            throw this.handle(error as Error);
        }
    }

    async delete(endpoint: string, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any>> {
        try {
            return this.http.delete(endpoint, config).then((data) => data);
        } catch (error) {
            throw this.handle(error as Error);
        }
    }

    private handle(error: Error) {
        throw new HttpServiceException(
            error.message,
        );
    }
}