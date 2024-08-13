const files = import.meta.glob('./modules/**/*.ts', { eager: true });
const modules: any = {};

Object.keys(files).forEach((key: string) => {
    const moduleName = key.replace(/^\.\/modules\/(.*)\.\w+$/, '$1');
    modules[moduleName] = files[key];
});

export default modules;