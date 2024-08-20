import { intersectionWith, isEqual, mergeWith, unionWith } from 'lodash-es';
import { isArray, isObject } from '@/utils/is';

/**
 * Recursively merge two objects.
 * 递归合并两个对象。
 *
 * @param source The source object to merge from. 要合并的源对象。
 * @param target The target object to merge into. 目标对象，合并后结果存放于此。
 * @param mergeArrays How to merge arrays. Default is "replace".
 *        如何合并数组。默认为replace。
 *        - "union": Union the arrays. 对数组执行并集操作。
 *        - "intersection": Intersect the arrays. 对数组执行交集操作。
 *        - "concat": Concatenate the arrays. 连接数组。
 *        - "replace": Replace the source array with the target array. 用目标数组替换源数组。
 * @returns The merged object. 合并后的对象。
 */
export function deepMerge<T extends object | null | undefined, U extends object | null | undefined>(
  source: T,
  target: U,
  mergeArrays: 'union' | 'intersection' | 'concat' | 'replace' = 'replace',
): T & U {
  if (!target) {
    return source as T & U;
  }
  if (!source) {
    return target as T & U;
  }

  return mergeWith({}, source, target, (sourceValue, targetValue) => {
    if (isArray(targetValue) && isArray(sourceValue)) {
      switch (mergeArrays) {
        case 'union':
          return unionWith(sourceValue, targetValue, isEqual);
        case 'intersection':
          return intersectionWith(sourceValue, targetValue, isEqual);
        case 'concat':
          return sourceValue.concat(targetValue);
        case 'replace':
          return targetValue;
        default:
          throw new Error(`Unknown merge array strategy: ${mergeArrays as string}`);
      }
    }

    if (isObject(targetValue) && isObject(sourceValue)) {
      return deepMerge(sourceValue, targetValue, mergeArrays);
    }

    return undefined;
  });
}

/**
 * opt  object | string
 * to_url object | string
 * 例:
 * this.Tips('/pages/test/test'); 跳转不提示
 * this.Tips({title:'提示'},'/pages/test/test'); 提示并跳转
 * this.Tips({title:'提示'},{tab:1,url:'/pages/index/index'}); 提示并跳转值tab上
 * tab=1 一定时间后跳转至 table上
 * tab=2 一定时间后跳转至非 table上
 * tab=3 一定时间后返回上页面
 * tab=4 关闭所有页面，打开到应用内的某个页面
 * tab=5 关闭当前页面，跳转到应用内的某个页面
 */
export const tips = function (opt: any, to_url: any) {
  if (typeof opt == 'string') {
    to_url = opt;
    opt = {};
  }

  let title = opt.title || '';
  let icon = opt.icon || 'none';
  let endtime = opt.endtime || 2000;
  let success = opt.success || null;

  if (title) {
    uni.showToast({
      title: title,
      icon: icon,
      duration: endtime,
      success,
    });
  }
  if (to_url != undefined) {
    if (typeof to_url == 'object') {
      let tab = to_url.tab || 1,
        url = to_url.url || '';
      switch (tab) {
        case 1:
          //一定时间后跳转至 table
          setTimeout(function () {
            uni.switchTab({
              url: url,
            });
          }, endtime);
          break;
        case 2:
          //跳转至非table页面
          setTimeout(function () {
            uni.navigateTo({
              url: url,
            });
          }, endtime);
          break;
        case 3:
          //返回上页面
          setTimeout(function () {
            // #ifndef H5
            uni.navigateBack({
              delta: parseInt(url),
            });
            // #endif
            // #ifdef H5
            history.back();
            // #endif
          }, endtime);
          break;
        case 4:
          //关闭所有页面，打开到应用内的某个页面
          setTimeout(function () {
            uni.reLaunch({
              url: url,
            });
          }, endtime);
          break;
        case 5:
          //关闭当前页面，跳转到应用内的某个页面
          setTimeout(function () {
            uni.redirectTo({
              url: url,
            });
          }, endtime);
          break;
      }
    } else if (typeof to_url == 'function') {
      setTimeout(function () {
        to_url && to_url();
      }, endtime);
    } else {
      //没有提示时跳转不延迟
      setTimeout(
        function () {
          uni.navigateTo({
            url: to_url,
          });
        },
        title ? endtime : 0,
      );
    }
  }
};
