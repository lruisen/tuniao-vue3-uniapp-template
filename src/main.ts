import { createSSRApp } from 'vue';
import App from './App.vue';
import httpRequest from './api';

export function createApp() {
    const app = createSSRApp(App);

    // 注入全局属性
    app.config.globalProperties.httpRequest = httpRequest;

    return {
        app,
    };
}