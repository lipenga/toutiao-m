<template>
  <div>
    <!-- 联想内容 -->
    <van-cell
      size="large"
      icon="search"
      :key="i"
      v-for="(item, i) in suggesslist"
      @click="$emit('search', item)"
    >
      <span slot="title" v-html="hightlight(item)"> </span>
    </van-cell>
  </div>
</template>

<script>
import { getsuggess } from '@/api/user.js'

import { debounce } from 'lodash'

export default {
  name: 'searchSuggess',
  data() {
    return {
      suggesslist: []
    }
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

      handler: debounce(function(value) {
        this.loadsuggess(value)
      }, 200),

      // 该回调将在侦听开始之后被调用
      immediate: true
    }
  },
  methods: {
    async loadsuggess(q) {
      //   发送请求触发联想，赋值渲染
      try {
        const { data } = await getsuggess(q)
        // console.log(data.data)
        this.suggesslist = data.data.options
      } catch (err) {}
    },
    // 给样式使关键字高亮
    hightlight(item) {
      const hightlightstr = `<span class='active'>${this.searchvalue}</span>`
      const reg = new RegExp(this.searchvalue, 'gi')
      return item.replace(reg, hightlightstr)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-cell .active {
  color: #23a9f2;
}
</style>
