import type { HttpRequestConfig } from 'luch-request';

export abstract class RequestTransform {
    
    requestInterceptors?: (config: HttpRequestConfig) => HttpRequestConfig | Promise<HttpRequestConfig>;
    
}