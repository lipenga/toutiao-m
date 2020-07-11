<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- / 导航栏 -->
    <input type="file" hidden ref="files" @change="onFileChange" />
    <!-- 个人信息 -->
    <van-cell title="头像" is-link @click="$refs.files.click()">
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
      @click="showsexpop = true"
    />
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link=""
      @click="showbirthday = true"
    />
    <!-- 编辑昵称弹出层 -->
    <van-popup v-model="shownamepop" position="top">
      <popname @close="shownamepop = false" :username="user.name" />
    </van-popup>
    <!-- 编辑性别 -->
    <van-popup v-model="showsexpop" position="top">
      <popsex
        v-if="showsexpop"
        @close="showsexpop = false"
        v-model="user.gender"
      />
    </van-popup>
    <!-- 编辑生日 -->
    <van-popup v-model="showbirthday" position="top">
      <popbirthday
        v-model="user.birthday"
        @close="showbirthday = false"
        v-if="showbirthday"
      />
    </van-popup>
    <!-- 图片头像 -->
    <van-popup v-model="showPhoto" position="top">
      <popimg v-model="imgdata" @close="showPhoto = false" />
    </van-popup>
  </div>
</template>

<script>
import { getUser } from '@/api/user.js'
import popname from './Popname.vue'
import popsex from './popsex.vue'
import popbirthday from './popbirthday.vue'
import popimg from './popimg.vue'
export default {
  name: 'editUserInfo',

  data() {
    return {
      user: {},
      shownamepop: false,
      showsexpop: false,
      showbirthday: false,
      showPhoto: false,
      imgdata: ''
    }
  },
  components: { popname, popsex, popbirthday, popimg },
  created() {
    this.loaduserinfo()
  },
  methods: {
    async loaduserinfo() {
      const { data } = await getUser()

      this.user = data.data
    },
    // 展示昵称
    popname() {
      this.shownamepop = true
    },
    onFileChange() {
      // 获取文件对象
      const file = this.$refs.files.files[0]
      // 基于文件对象获取blob数据
      this.imgdata = window.URL.createObjectURL(file)

      this.showPhoto = true
      this.$refs.files.value = ''
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
