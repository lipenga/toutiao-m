<template>
  <div>
    <van-picker
      title="填写性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      :default-index="value"
      @change="onChange"
    />
  </div>
</template>

<script>
import { UpdataUser } from '@/api/user.js'
export default {
  name: 'popsex',
  data() {
    return { message: '', columns: ['男', '女'], localgender: this.value }
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  methods: {
    onChange(picker, value, index) {
      this.localgender = index
    },
    async onConfirm() {
      try {
        await UpdataUser({ gender: this.localgender })
        this.$emit('input', this.localgender)
        this.$toast.success('更新成功')
        this.$emit('close')
        // location.reload()
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
