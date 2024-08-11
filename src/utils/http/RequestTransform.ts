import type { HttpRequestConfig } from 'luch-request';

export interface RequestTransform {
    /**
     * 请求拦截器
     * @param config
     */
    requestInterceptors?: (config: HttpRequestConfig) => HttpRequestConfig | Promise<HttpRequestConfig>;
    
}