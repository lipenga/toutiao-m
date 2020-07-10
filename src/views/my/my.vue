<template>
  <div>
    <!-- 已经登陆头部 -->
    <div v-if="user">
      <div class="baseinfo">
        <div>
          <img id="avatar" :src="this.userinfo.photo" />
        </div>
        <div>
          <span class="username">{{ this.userinfo.name }}</span>
        </div>
        <div id="editdiv" @click="edit">编辑资料</div>
      </div>
      <div class="data-list">
        <div>
          <span>{{ this.userinfo.art_count }}</span>
          <span>头条</span>
        </div>
        <div>
          <span>{{ this.userinfo.follow_count }}</span>
          <span>关注</span>
        </div>
        <div>
          <span>{{ this.userinfo.fans_count }}</span>
          <span>粉丝</span>
        </div>
        <div>
          <span>{{ this.userinfo.like_count }}</span>
          <span>获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登陆头部 -->
    <div class="heard" v-else>
      <div class="loginhead" @click="$router.push('/')">
        <img class="phone_img" src="~@/assets/mobile.png" />
        <span id="text">登陆/注册</span>
      </div>
    </div>

    <!-- 公共部分 -->
    <div>
      <van-grid clickable :column-num="2">
        <van-grid-item>
          <i slot="icon" class="iconfont icon-mark"></i>
          <span slot="text">收藏</span>
        </van-grid-item>
        <van-grid-item>
          <i slot="icon" class="iconfont icon-search"></i>
          <span slot="text">历史</span>
        </van-grid-item>
      </van-grid>
      <van-cell title="消息通知" class="mestitle" is-link />
      <van-cell title="小智同学" is-link />
    </div>
    <van-cell
      v-if="user"
      title="退出登陆"
      is-link
      class="logout-cell"
      @click="logout"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user.js'
export default {
  name: 'myindex',
  data() {
    return {
      userinfo: {}
    }
  },
  created() {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  methods: {
    logout() {
      this.$dialog
        .confirm({ title: '确定退出登陆吗？' })
        .then(() => {
          this.$store.commit('setUser', null)
          // window.localStorage.removeItem('token')
          // this.$router.push('/')
        })
        .catch(() => {
          console.log('取消退出登陆')
        })
    },
    async loadUserInfo() {
      try {
        const res = await getUserInfo()
        this.userinfo = res.data.data
      } catch (err) {
        this.$toast('获取数据失败，请稍后重试')
      }
    },
    edit() {
      this.$router.push('/edit')
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>
<style scoped>
.heard {
  background-color: #3b98fe;
  height: 361px;
  background-image: url('~@/assets/banner.png');
  position: relative;
}
.phone_img {
  position: absolute;
  color: beige;
  width: 132px;
  height: 132px;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
}

#text {
  position: absolute;
  color: beige;
  left: 50%;
  top: 85%;
  transform: translate(-50%, -50%);
  font-size: 28px;
}
.baseinfo {
  height: 231px;
  background-color: #429fff;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  background-image: url('~@/assets/banner.png');
}
#avatar {
  width: 132px;
  height: 132px;
  top: 4%;
  left: 5%;
  position: absolute;
  border-radius: 66px;
}
.username {
  color: beige;
  font-size: 28px;
  position: absolute;
  left: 27%;
}
#editdiv {
  background-color: #fff;
  height: 40px;
  border-radius: 20px;
  position: absolute;
  right: 15px;
  width: 150px;
  font-size: 25px;
  text-align: center;
}
.data-list {
  height: 130px;
  background-color: #cccccc;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
.data-list div {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  font-size: 28px;
}
.icon-mark {
  color: red;
  font-size: 80px;
}
.icon-search {
  color: #3b98fe;
  font-size: 80px;
}
.logout-cell {
  text-align: center;
  margin-top: 5px;
  color: red;
}
.mestitle {
  margin-top: 5px;
}
</style>
