<template>
  <van-button
    @click="onFOLLOW"
    class="follow-btn"
    round
    size="small"
    v-if="value"
    :loading="isload"
    >已关注</van-button
  >
  <van-button
    v-else
    :loading="isload"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    @click="onFOLLOW"
    icon="plus"
    >关注</van-button
  >
</template>

<script>
import { addFollow, delFollow } from '@/api/user.js'
export default {
  name: 'onbtn',
  data() {
    return {
      isload: false
    }
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    userID: {
      type: [String, Object, Number],
      required: true
    }
  },
  methods: {
    async onFOLLOW() {
      this.isload = true
      try {
        if (this.value) {
          await delFollow(this.userID)
        } else {
          await addFollow(this.userID)
        }
        this.$emit('input', !this.value)
      } catch (err) {
        let message = '操作失败，重试'
        if (err.response && err.response.status === 400) {
          message = '不能关注自己'
        }
        this.$toast(message)
      }
      this.isload = false
    }
  }
}
</script>

<style>
</style>
