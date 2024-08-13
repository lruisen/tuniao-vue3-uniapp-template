import { createSSRApp } from 'vue';
import App from './App.vue';
import http from './api';

const test = http.common.testApi();

console.log(test);

export function createApp() {
    const app = createSSRApp(App);

    // 注入全局属性
    app.config.globalProperties.$http = http;

    return {
        app,
    };
}