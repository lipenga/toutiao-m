<template>
  <div>
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      left-arrow
      @click-left="$emit('close')"
      @click-right="onClickRight"
    /><van-field
      v-model="message"
      rows="2"
      autosize
      label=""
      type="textarea"
      maxlength="12"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { UpdataUser } from '@/api/user.js'
export default {
  name: 'popname',
  data() {
    return { message: this.username }
  },
  props: ['username'],
  methods: {
    //   点击完成
    async onClickRight() {
      try {
        const res = await UpdataUser({ name: this.message })
        console.log(res)
        this.$toast.success('更新成功')
        this.$emit('close')
        location.reload()
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
