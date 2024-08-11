import type { CreateRequestOptions } from '@/utils/http/types';
import { IRequest } from '@/utils/http/IRequest';
import { deepMerge } from '@/utils';
import { RequestTransform } from './RequestTransform';
import type { HttpRequestConfig } from 'luch-request';

const transform: RequestTransform = {
    /**
     * 请求拦截器
     * @param config
     */
    requestInterceptors: (config: HttpRequestConfig) => {
        return config;
    },
};

/**
 * 创建请求实例
 * @param opt 配置
 */
function createRequest(opt?: Partial<CreateRequestOptions>) {
    return new IRequest(
        deepMerge({
            transform: transform
        }, opt)
    );
}

export const http: IRequest = createRequest();

// 多个不同 api 地址，直接在这里导出多个
// src/api ts 里面接口，就可以单独使用这个请求，
// import { httpTwo } from '@/utils/http'
// export const httpTwo = createRequest({
//     baseURL: 'http://localhost:9001',
// });