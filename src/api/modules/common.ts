import { http } from '@/utils/http';
import { RequestMethodEnum } from '@/utils/http/HttpEnum';

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