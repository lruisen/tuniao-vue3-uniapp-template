// 加载所有模块
const modules = import.meta.glob('./modules/**/*.ts', {eager: true});
const apis: any = {};

Object.keys(modules).forEach((key: string) => {
    const mod = modules[key].default || {};
    const moduleName = key.replace(/^\.\/modules\/(.*)\.\w+$/, '$1');
    apis[moduleName] = mod;
}


