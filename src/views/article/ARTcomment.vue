<template
  ><van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell v-for="(item, i) in list" :key="i" :title="item.content" />
  </van-list>
</template>

<script>
import { getArticle } from '@/api/user.js'
export default {
  name: 'CommentList',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },

  props: {
    source: {
      type: [Object, String, Number],
      required: true
    }
  },
  created() {
    this.onLoad()
  },
  methods: {
    // 1.发请求
    async onLoad() {
      try {
        const { data } = await getArticle({
          type: 'a',
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit
        })
        console.log(data)
        // 2 .列表赋值
        const { results } = data.data
        this.list.push(...results)
        // 文章评论总数传递到外部
        this.$emit('getSuccess', data.data)
        // 3 loading设置为false
        this.loading = false
        // 4 判断是否还有数据
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {}
    }
  }
}
</script>

<style></style>
