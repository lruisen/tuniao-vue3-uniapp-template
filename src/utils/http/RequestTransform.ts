import type { HttpError, HttpRequestConfig, HttpResponse } from 'luch-request';

export interface RequestTransform {
    /**
     * 请求拦截器
     * @param config
     */
    requestInterceptors?: (config: HttpRequestConfig) => HttpRequestConfig | Promise<HttpRequestConfig>;

    /**
     * 请求拦截器错误处理
     * @param error
     */
    requestInterceptorsCatch?: (error: HttpRequestConfig) => void;

    /**
     * 响应拦截器
     * @param response
     */
    responseInterceptors?: (response: HttpResponse) => any;

    /**
     * 响应拦截器错误处理
     * @param error
     */
    responseInterceptorsCatch?: (error: HttpError) => void;
}