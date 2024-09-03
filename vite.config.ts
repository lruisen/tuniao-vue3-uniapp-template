import { defineConfig, loadEnv } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import path from 'node:path';
import AutoImport from 'unplugin-auto-import/vite';
import UnoCSS from 'unocss/vite';

// https://vitejs.dev/config/
export default ({ mode }) => {
  const { UNI_PLATFORM } = process.env;
  const env = loadEnv(mode, path.resolve(process.cwd()));
  const { VITE_PORT, VITE_DROP_CONSOLE } = env;

  return defineConfig({
    base: './',
    plugins: [
      uni(),
      UnoCSS(),
      AutoImport({
        imports: ['vue', 'uni-app'],
        dts: './types/auto-import.d.ts',
        dirs: [], // 自动导入文件夹中的内容
        eslintrc: { enabled: true },
        vueTemplate: true, // default false
      }),
    ],
    define: {
      __UNI_PLATFORM__: JSON.stringify(UNI_PLATFORM),
    },
    css: {
      postcss: {
        plugins: [
          // autoprefixer({
          //   // 指定目标浏览器
          //   overrideBrowserslist: ['> 1%', 'last 2 versions'],
          // }),
        ],
      },
    },
    resolve: {
      alias: {
        '@': path.join(process.cwd(), './src'),
        '@img': path.join(process.cwd(), './src/static/images'),
      },
    },
    server: {
      hmr: true,
      host: '0.0.0.0',
      port: parseInt(VITE_PORT, 10),
      // 仅 H5 端生效，其他端不生效（其他端走build，不走devServer)
      // proxy: undefined,
    },
    build: {
      // 方便非h5端调试
      sourcemap: true, // App，小程序端源码调试需要开启 sourcemap
      target: 'es6',
      // 开发环境不用压缩
      minify: mode === 'development' ? false : 'terser',
      terserOptions: {
        compress: {
          drop_console: VITE_DROP_CONSOLE === 'true',
          drop_debugger: true,
        },
      },
    },
  });
};
