<script setup lang="ts">
  import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';
  import { debugWarn } from '@tuniao/tnui-vue3-uniapp/utils';

  onLaunch(() => {
    console.log('App Launch');
    // 加载字体
    uni.loadFontFace({
      family: 'tuniao-xiaowei',
      source: 'url("https://resource.tuniaokj.com/images/vue3-template/template2-website/font/tuniao-xiaowei.ttf")',
      fail: (err) => {
        debugWarn('load-font', `加载字体失败: ${err}`);
        console.error(err);
      },
    });
  });

  onShow(() => {
    console.log('App Show');
  });
  
  onHide(() => {
    console.log('App Hide');
  });
</script>

<style lang="scss">
  @import '@tuniao/tn-style/dist/uniapp/index.css';
</style>
