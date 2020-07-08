<template>
  <van-button
    :icon="value ? 'star' : 'star-o'"
    :class="{ like: value }"
    @click="onCollect"
    :loading="loading"
  />
</template>

<script>
import { collect, Nocollect } from '@/api/user.js'

export default {
  name: 'collect',
  data() {
    return { loading: false }
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    collectID: {
      type: [String, Object, Number],
      required: true
    }
  },
  methods: {
    async onCollect() {
      this.loading = true
      try {
        if (!this.value) {
          await collect(this.collectID)
        } else {
          await Nocollect(this.collectID)
        }
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏成功')
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.like {
  color: red;
}
</style>
