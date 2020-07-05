<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败，点击重试"
      @load="onLoad"
    >
      <van-cell v-for="(item, i) in this.resultsList" :key="i">
        {{ item.title }}
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getresults } from '@/api/user.js'

export default {
  name: 'searchresult',
  data() {
    return {
      loading: false,
      finished: false,
      page: 1,
      per_page: 7,
      resultsList: [],
      error: false
    }
  },
  props: ['searchvalue'],
  methods: {
    async onLoad() {
      //  1.获取请求数据
      try {
        const { data } = await getresults({
          page: this.page,
          per_page: this.per_page,
          q: this.searchvalue
        })
        console.log(data)
        const { results } = data.data
        //  2.将数据添加到列表中。
        this.resultsList.push(...results)
        //  3.将本次加载中的load关闭
        this.loading = false
        //  4，判断是否还有数据，
        if (results.length) {
          //  如果有，则请求下一个数据的页码，
          this.page++
        } else {
          //  如果没有。则finisheds设置为结束
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
        // this.$toast('数据获取失败，请稍后重试')
      }
    }
  }
}
</script>

<style></style>
