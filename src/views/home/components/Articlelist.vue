<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="tipsuccess"
      success-duration="3200"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <articleItem
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
        <!-- <van-cell v-for="item in list" :key="item.ch_id" :title="item.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getnewslist } from '@/api/user.js'
import articleItem from './articleItem/index'

export default {
  name: 'Articlelist',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      nexttime: null,
      error: false,
      isLoading: false,
      tipsuccess: '2312'
    }
  },

  methods: {
    // 触发下拉刷新
    async onRefresh() {
      try {
        const { data } = await getnewslist({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        const { results } = data.data
        // 2.将数据追加到列表的顶部
        this.list.unshift(...results)
        // 关闭下拉刷新的loading状态
        this.isLoading = false
        // 更新下拉刷新成功提示文本
        this.tipsuccess = `更新了条${results.length}数据`
      } catch (err) {
        console.log('请求失败', err)
        this.tipsuccess = '刷新失败'
        // 展示错误信息
        this.error = true
        this.isLoading = false
      }
    },
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求

      try {
        const { data } = await getnewslist({
          channel_id: this.channel.id,
          timestamp: this.nexttime || Date.now(),
          with_top: 0
        })
        // 故意开启请求失败
        // if (Math.random() < 0.5) {
        //   JSON.parse('dfsdf')
        // }

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
        // 展示错误信息
        this.error = true
        this.loading = false
      }
    }
  },
  components: { articleItem },
  props: ['channel']
}
</script>
<style lang="less" scoped>
.article-list {
  height: 78vh;
  overflow-y: auto;
}
</style>
