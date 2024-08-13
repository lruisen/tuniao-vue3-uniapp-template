<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"/>
    <view class="text-area">
      <text class="title" @click="showNotice">{{ title }}</text>
    </view>
    <TnNotice ref="notifyRef"></TnNotice>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TnNotice from '@tuniao/tnui-vue3-uniapp/components/notify/src/notify.vue';
import type { TnNotifyInstance } from '@tuniao/tnui-vue3-uniapp';

const notifyRef = ref<TnNotifyInstance>();
const showNotice = () => notifyRef.value?.show({
  type: 'info',
  msg: '成功',
  position: 'center'
});
const title = ref('Hello');

uni.showToast();
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
