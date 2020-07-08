<template>
  <van-button
    :icon="value === 1 ? 'good-job' : 'good-job-o'"
    :class="{
      liked: value === 1
    }"
    :loading="loading"
    @click="onlike"
  />
</template>

<script>
import {} from '@/api/user.js'

export default {
  name: 'onlike',
  data() {
    return { loading: false }
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  methods: {
    onlike() {
      console.log(1)
    }
    // async onCollect() {
    //   this.loading = true
    //   try {
    //     if (!this.value) {
    //       await collect(this.collectID)
    //     } else {
    //       await Nocollect(this.collectID)
    //     }
    //     this.$emit('input', !this.value)
    //     this.$toast.success(!this.value ? '收藏成功' : '取消收藏成功')
    //     this.loading = false
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }
  }
}
</script>

<style lang="less" scoped>
/deep/.like {
  color: red;
}
</style>
