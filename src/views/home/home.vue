<template>
  <div class="home-container">
    <!-- 首页导航栏 -->
    <div>
      <van-nav-bar class="page-nav-bar" fixed>
        <van-button
          class="search-btn"
          slot="title"
          size="small"
          round
          type="info"
          icon="search"
          @click="toSearch"
        >
          搜索</van-button
        >
      </van-nav-bar>
      <!-- 导航栏结束 -->
    </div>
    <!-- 频道列表 -->
    <van-tabs class="tabs" v-model="active" animated swipeable>
      <van-tab
        :title="channel.name"
        v-for="channel in channel"
        :key="channel.id"
        ><Articlelist :channel="channel"></Articlelist
      ></van-tab>

      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hbgbtn">
        <i class="iconfont icon-menu" @click="showPopup"></i>
        <!-- <van-icon name="bars"></van-icon> -->
      </div>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      closeable
      v-model="show"
      position="top"
      :style="{ height: '85%' }"
      close-icon-position="top-left"
    >
      <!-- 弹出层我的内容列表插槽 -->
      <channeledit
        :mychannels="channel"
        :active="active"
        @updataActive="onUpdataActive"
      ></channeledit>
    </van-popup>
  </div>
</template>
<script>
import { getuserlist } from '@/api/user'
import Articlelist from './components/Articlelist'
import channeledit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage.js'
export default {
  name: 'homeindex',
  components: { Articlelist, channeledit },
  data() {
    return {
      active: 0,
      // 频道列表
      channel: [],
      show: false
    }
  },

  created() {
    this.loaduserlist()
  },
  methods: {
    // 跳转到搜索页
    toSearch() {
      this.$router.push('/search')
    },
    // 获取首页列表
    async loaduserlist() {
      let channels = []
      try {
        if (this.user) {
          // 已登陆获取线上列表数据
          const res = await getuserlist()
          channels = res.data.data.channels
        } else {
          // 未登录 判断本地是否有频道列表数据
          const location = getItem('TOUTIAO_CHANNELS')
          // 如果有，拿来用
          if (location) {
            channels = location
          } else {
            // 没有，请求获取默认频道列表
            const res = await getuserlist()
            channels = res.data.data.channels
          }
        }
        this.channel = channels
      } catch (err) {
        this.$toast.fail('获取错误')
      }
    },
    showPopup() {
      this.show = true
    },
    onUpdataActive(index, show = true) {
      this.active = index
      this.show = show
    }
  },
  computed: {
    ...mapState(['user'])
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
  padding-bottom: 100px;
  padding-top: 174px;

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
    position: fixed;
    z-index: 1;
    left: 0;
    right: 0;
    top: 90px;
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
