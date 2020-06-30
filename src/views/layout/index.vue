<template>
  <div>
    <router-view />
    <van-tabbar route>
      <van-tabbar-item to="/">
        <i slot="icon" class="iconfont icon-home"></i
        ><span>首页</span></van-tabbar-item
      >
      <van-tabbar-item to="/qa">
        <i slot="icon" class="iconfont icon-voice"></i
        ><span>问答</span></van-tabbar-item
      >
      <van-tabbar-item to="/video"
        ><i slot="icon" class="iconfont icon-video"></i
        ><span>视频</span></van-tabbar-item
      >
      <van-tabbar-item to="/my"
        ><i slot="icon" class="iconfont icon-nickname"></i
        ><span>{{
          $store.state.user ? '我的' : '未登录'
        }}</span></van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: ''
    }
  }
}
</script>
<style scoped>
.van-tabbar i {
  font-size: 40px;
}
.van-tabbar span {
  font-size: 20px;
}
</style>
