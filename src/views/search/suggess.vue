<template>
  <div>
    <!-- 联想内容 -->
    <van-cell size="large" :key="i" v-for="(item, i) in suggesslist">
      <i slot="title" class="iconfont icon-search">{{ item }}</i>
    </van-cell>
  </div>
</template>

<script>
import { getsuggess } from '@/api/user.js'
export default {
  name: 'searchSuggess',
  data() {
    return { suggesslist: [] }
  },
  props: {
    searchvalue: {
      type: String,
      required: true
    }
  },

  //   监听事件
  watch: {
    searchvalue: {
      //   当searchtext发生改变的时候会调用，handle函数名称是固定的
      async handler(value) {
        //   发送请求触发联想，赋值渲染
        const { data } = await getsuggess(value)
        console.log(data.data)
        this.suggesslist = data.data.options
      },
      // 该回调将在侦听开始之后被调用
      immediate: true
    }
  }
}
</script>

<style>
</style>
