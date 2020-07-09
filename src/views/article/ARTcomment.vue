<template
  ><van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell v-for="item in list" :key="item" :title="item" />
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
  methods: {
    async onLoad() {
      try {
        const { data } = await getArticle({
          type: 'a',
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit
        })
        console.log(data)
      } catch (err) {}
    }
  }
}
</script>

<style></style>
