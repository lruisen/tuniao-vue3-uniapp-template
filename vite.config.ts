import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [uni()],
    base: './',
    build: {
        sourcemap: true, // App，小程序端源码调试需要开启 sourcemap 
    }
});
