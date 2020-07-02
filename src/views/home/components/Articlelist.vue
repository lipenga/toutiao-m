<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.ch_id" :title="item.title" />
    </van-list>
  </div>
</template>
<script>
import { getnewslist } from '@/api/user.js'
export default {
  name: 'Articlelist',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      nexttime: null
    }
  },

  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求

      try {
        const { data } = await getnewslist({
          channel_id: this.channel.id,
          timestamp: this.nexttime || Date.now(),
          with_top: 0
        })
        const { results } = data.data

        this.list.push(...results)
        // 加载状态结束
        this.loading = false
        //  判断数据是否加载完成
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.nexttime = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        console.log('请求失败', err)
      }
    }
  },
  components: {},
  props: ['channel']
}
</script>
<style lang="less" scoped>
</style>
