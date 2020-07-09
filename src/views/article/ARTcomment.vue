<template
  ><van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :immediate-check="false"
  >
    <Artitem
      v-for="(item, i) in list"
      :key="i"
      :title="item.content"
      :comment="item"
      @reply-click="$emit('reply-click', $event)"
    />
  </van-list>
</template>

<script>
import { getArticle } from '@/api/user.js'
import Artitem from './ARTitem.vue'
export default {
  name: 'CommentList',
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  components: { Artitem },
  props: {
    source: {
      type: [Object, String, Number],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      validator(value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  created() {
    this.loading = true
    this.onLoad()
  },
  methods: {
    // 1.发请求
    async onLoad() {
      try {
        const { data } = await getArticle({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit
        })
        // console.log(data)
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
