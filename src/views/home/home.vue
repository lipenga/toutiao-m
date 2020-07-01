<template>
  <div id="home-container">
    <!-- 首页导航栏 -->

    <van-nav-bar class="page-nav-bar">
      <van-button
        class="search-btn"
        slot="title"
        size="small"
        round
        type="info"
        icon="search"
      >
        搜索</van-button
      >
    </van-nav-bar>
    <!-- 导航栏结束 -->
  </div>
</template>
<script>
export default {
  data() {
    return {}
  }
}
</script>
<style scoped>
#home-container .van-nav-bar__title {
  max-width: 100%;
}
.search-btn {
  width: 555px;
  height: 64px;
  background-color: #5babfb;
  border: none;
}
</style>
