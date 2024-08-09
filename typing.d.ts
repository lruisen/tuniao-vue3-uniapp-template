// eslint-disable-next-line @typescript-eslint/no-unused-vars

declare module 'luch-request' {
    interface HttpRequestConfig {
        custom: {
            showLoading?: boolean;
            showError?: boolean;
        };
    }
}
