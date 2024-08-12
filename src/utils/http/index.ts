import type { HttpError, HttpRequestConfig, HttpResponse } from 'luch-request';
import Request from 'luch-request';
import { RequestTransform } from './RequestTransform';
import { isFunction } from '../is';

const transform: RequestTransform = {
    /**
     * 请求拦截器
     * @param config
     */
    requestInterceptors: (config: HttpRequestConfig): HttpRequestConfig | Promise<HttpRequestConfig> => {
        return config;
    },

    /**
     * 请求拦截器错误处理
     * @param error
     */
    requestInterceptorsCatch: (error: HttpRequestConfig): void => {
        return Promise.reject('网络错误，请稍后重试');
    },

    /**
     * 响应拦截器
     * @param response
     */
    responseInterceptors: (response: HttpResponse): any => {
        return response;
    },

    /**
     * 响应拦截器错误处理
     * @param error
     */
    responseInterceptorsCatch: (error: HttpError): void => {
        return Promise.reject('服务异常，请稍后重试');
    }
};

/**
 * 创建请求实例
 * @param opt 配置
 */
function createRequest(config?: Partial<HttpRequestConfig> = {}, transform?: RequestTransform = {}): Request {
    const httpRequest = new Request(config);

    const {
        requestInterceptors,
        requestInterceptorsCatch,
        responseInterceptors,
        responseInterceptorsCatch,
    } = transform;

    // 请求拦截器
    httpRequest.interceptors.request.use(
        (config: HttpRequestConfig): HttpRequestConfig | Promise<HttpRequestConfig> => {

            if (requestInterceptors && isFunction(requestInterceptors)) {
                config = requestInterceptors(config);
            }

            return config;
        },
        (error: HttpRequestConfig): void => {
            if (requestInterceptorsCatch && isFunction(requestInterceptorsCatch)) {
                requestInterceptorsCatch(error);
            }
        }
    );

    // 响应拦截器
    httpRequest.interceptors.response.use(
        (response: HttpResponse): any => {

            if (responseInterceptors && isFunction(responseInterceptors)) {
                response = responseInterceptors(response);
            }

            return response.data;
        },
        (error: HttpError): void => {
            if (responseInterceptorsCatch && isFunction(responseInterceptorsCatch)) {
                responseInterceptorsCatch(error);
            }
        }
    );

    return httpRequest;
}

export const http: Request = createRequest(
    {
        baseURL: import.meta.env,
        timeout: 10000,
    },
    transform
);

// 多个不同 api 地址，直接在这里导出多个
// src/api ts 里面接口，就可以单独使用这个请求，
// import { httpTwo } from '@/utils/http'
// export const httpTwo = createRequest({
//     baseURL: 'http://localhost:9001',
// }, transform);