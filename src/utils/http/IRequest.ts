import Request, { type HttpRequestConfig } from 'luch-request';
import type { CreateRequestOptions } from '@/utils/http/types';

export class IRequest {
    private requestInstance: Request;
    private options: CreateRequestOptions;
    
    constructor(options: CreateRequestOptions) {
        this.options = options;
        this.requestInstance = new Request();
        this.setupInterceptors();
    }
    
    /**
     * 设置默认配置
     * @param config
     */
    setConfig(config: HttpRequestConfig) {
        this.requestInstance.config = config;
    }
    
    /**
     * 拦截器配置
     * @private
     */
    private setupInterceptors() {
        const {transform} = this.options;
        if (! transform) return;
        
        const {} = transform;
        
        // 请求拦截器
        this.requestInstance.interceptors.request.use(
            (config, options) => {
                return config;
            },
            (error) => Promise.reject(error)
        );
        
        // 响应拦截器
        this.requestInstance.interceptors.response.use(
            (response, options) => {
                return response;
            },
            (error) => Promise.reject(error)
        );
    }
}