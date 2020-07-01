<template>
  <div class="home-container">
    <!-- 首页导航栏 -->
    <div>
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
    <!-- 频道列表 -->
    <van-tabs class="tabs" v-model="active" animated swipeable>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id"
        >{{ item.name }}的内容</van-tab
      >

      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hbgbtn">
        <i class="iconfont icon-menu"></i>
        <!-- <van-icon name="bars"></van-icon> -->
      </div>
    </van-tabs>
  </div>
</template>
<script>
import { getuserlist } from '@/api/user'
export default {
  name: 'homeindex',
  data() {
    return {
      active: 0,
      channels: []
    }
  },
  created() {
    this.loaduserlist()
  },
  methods: {
    // 获取首页列表
    async loaduserlist() {
      try {
        const res = await getuserlist()

        this.channels = res.data.data.channels
        console.log(this.channels)
      } catch (err) {
        this.$toast.fail('获取错误')
      }
    }
  }
}
</script>
<style scoped lang="less">
.placeholder {
  width: 66px;
  height: 82px;
  flex-shrink: 0;
}
.home-container {
  .van-icon {
    font-size: 37px;
    color: #fff;
  }
}
.search-btn {
  width: 555px;
  height: 64px;
  background-color: #5babfb;
  border: none;
  font-size: 32px;
}
.van-nav-bar {
  background-color: #2892ff;
}
.van-nav-bar__title {
  font: #fff;
}
/deep/ .tabs {
  .van-tabs__wrap {
    height: 82px;
  }
  .van-tab {
    min-width: 200px;
    border-right: 1px solid #edeff3;
    font-size: 30px;
  }

  .van-tab--active {
    color: black;
    font-weight: 900;
  }
  .van-tabs__line {
    background-color: blue;
    width: 31px !important;
  }
}
.hbgbtn {
  position: fixed;
  width: 66px;
  height: 82px;
  right: 0;
  // top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  opacity: 0.902;
  i.icon-menu {
    font-size: 49px;
  }
  &:before {
    content: '';
    width: 1px;
    height: 100%;
    background-image: url(~@/assets/gradient-gray-line.png);
    background-size: contain;
    position: absolute;
    left: 0;
  }
}
</style>
