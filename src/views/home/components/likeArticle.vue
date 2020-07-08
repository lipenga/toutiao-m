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
import { NolikeArt, likeArt } from '@/api/user.js'

export default {
  name: 'onlike',
  data() {
    return { loading: false }
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [String, Object, Number],
      required: true
    }
  },
  methods: {
    async onlike() {
      this.loading = true
      try {
        let status = -1

        if (this.value === 1) {
          // 已经点赞，取消点赞
          await NolikeArt(this.articleId)
        } else {
          await likeArt(this.articleId)
          status = 1
        }
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞成功')
      } catch (err) {
        this.$toast.fail('操作失败，重试')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.liked {
  color: red;
}
</style>
