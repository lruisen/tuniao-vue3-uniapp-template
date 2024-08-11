import type { HttpRequestConfig } from 'luch-request';

export interface CreateRequestOptions extends HttpRequestConfig {
    transform: any,
}

export interface RequestOptions {
}