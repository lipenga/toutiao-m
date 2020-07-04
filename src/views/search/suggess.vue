<template>
  <div>
    <!-- 联想内容 -->
    <van-cell title="单元格" size="large">
      <i slot="title" class="iconfont icon-search">联想内容</i>
    </van-cell>
    <van-cell title="单元格" size="large">
      <i slot="title" class="iconfont icon-search">联想内容</i>
    </van-cell>
    <van-cell title="单元格" size="large">
      <i slot="title" class="iconfont icon-search">联想内容</i>
    </van-cell>
    <van-cell title="单元格" size="large">
      <i slot="title" class="iconfont icon-search">联想内容</i>
    </van-cell>
    <van-cell title="单元格" size="large">
      <i slot="title" class="iconfont icon-search">联想内容</i>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'searchSuggess',
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
      handler(value) {
        console.log(value)
      },
      // 该回调将在侦听开始之后被调用
      immediate: true
    }
  }
}
</script>

<style>
</style>
