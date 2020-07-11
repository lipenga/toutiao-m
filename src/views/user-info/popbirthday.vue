<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import { UpdataUser } from '@/api/user.js'
import dayjs from 'dayjs'
export default {
  name: 'birthday',
  data() {
    return {
      minDate: new Date(1920, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    async onConfirm() {
      const birthday = dayjs(this.currentDate).format('YYYY-MM-DD')
      try {
        await UpdataUser({
          birthday: birthday
        })
        this.$emit('input', birthday)
        this.$toast.success('更新成功')
        this.$emit('close')
      } catch (err) {
        this.$toast(err)
      }
    },
    onChange(picker, value, index) {}
  }
}
</script>

<style lang="less" scoped>
</style>
