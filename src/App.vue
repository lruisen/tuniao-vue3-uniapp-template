<template>
  <div class="root">

  </div>
</template>

<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';


onLaunch(() => {
  console.log('App Launch');
});
onShow(() => {
  console.log('App Show');
});
onHide(() => {
  console.log('App Hide');
});
</script>
<style>
@import '@tuniao/tn-style/dist/uniapp/index.css';
</style>

<style lang="sass" scoped></style>
