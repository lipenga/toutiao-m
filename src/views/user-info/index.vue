<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 个人信息 -->
    <van-cell title="头像" is-link>
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      :value="this.user.name"
      is-link=""
      @click="popname"
    />
    <van-cell
      title="性别"
      :value="user.gender === 0 ? '男' : '女'"
      is-link=""
    />
    <van-cell title="生日" :value="user.birthday" is-link="" />
    <!-- 编辑昵称弹出层 -->
    <van-popup v-model="shownamepop" position="top">
      <popname @close="shownamepop = false" :username="user.name" />
    </van-popup>
  </div>
</template>

<script>
import { getUser } from '@/api/user.js'
import popname from './Popname.vue'
export default {
  name: 'editUserInfo',

  data() {
    return {
      user: {},
      shownamepop: false
    }
  },
  components: { popname },
  created() {
    this.loaduserinfo()
  },
  methods: {
    async loaduserinfo() {
      const { data } = await getUser()

      this.user = data.data
      console.log(this.user)
    },
    // 展示昵称
    popname() {
      this.shownamepop = true
    }
  }
}
</script>

<style lang="less" scoped>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
}
</style>
