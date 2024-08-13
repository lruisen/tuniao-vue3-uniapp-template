import { http } from '@/utils/http';
import { RequestMethodEnum } from '@/utils/http/HttpEnum';

/**
 * 测试API
 * @param params
 */
export const testApi = (params: any) => {
    return http.request({
        url: '/test',
        method: RequestMethodEnum.GET,
        params,
    });
};

/**
 * @description: 上传图片
 * @param data
 */
export const uploadImage = (data: any) => {
    return http.request({
        url: '/upload/image',
        method: RequestMethodEnum.POST,
        data,
    });
};