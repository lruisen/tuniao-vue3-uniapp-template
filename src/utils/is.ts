const toString = Object.prototype.toString;

export function is(val: unknown, type: string) {
    return toString.call(val) === `[object ${type}]`;
}

export function isDef<T = unknown>(val?: T): val is T {
    return typeof val !== 'undefined';
}

export function isObject(val: any): val is Record<any, any> {
    return val !== null && is(val, 'Object');
}

export function isArray(val: any): val is Array<any> {
    return val && Array.isArray(val);
}

export function isWindow(val: any): val is Window {
    return typeof window !== 'undefined' && is(val, 'Window');
}

export const isServer = typeof window === 'undefined';

export const isClient = ! isServer;

export function isHttpUrl(path: string): boolean {
    const reg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/;
    return reg.test(path);
}

export function isPascalCase(str: string): boolean {
    const regex = /^[A-Z][A-Za-z]*$/;
    return regex.test(str);
}

/**
 * @description:  是否为函数
 */
export function isFunction<T = Function>(val: unknown): val is T {
    return is(val, 'Function');
}

/**
 * 判断是否 url
 * */
export function isUrl(url: string) {
    return /^(http|https):\/\//g.test(url);
}