import { createSSRApp } from 'vue';
import App from './App.vue';
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue';
import TnNavbar from '@tuniao/tnui-vue3-uniapp/components/navbar/src/navbar.vue';
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue';

import 'virtual:uno.css';

export function createApp() {
  const app = createSSRApp(App);

  // 注册全局组件
  app.component('TnIcon', TnIcon);
  app.component('TnNavbar', TnNavbar);
  app.component('TnButton', TnButton);

  return {
    app,
  };
}
