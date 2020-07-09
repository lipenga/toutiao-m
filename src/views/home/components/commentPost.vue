<template>
  <div class="comment-post">
    <van-field
      v-model="content"
      class="post-field"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" @click="addComment">发布</van-button>
  </div>
</template>

<script>
import { postComment } from '@/api/user.js'

export default {
  name: 'CommentPost',

  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      message: '',
      content: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async addComment() {
      try {
        const { data } = await postComment({
          target: this.target,
          content: this.content,
          art_id: null
        })
        console.log(data)
        this.$emit('successpost', data.data)
        // 关闭弹出层

        // 将发布内容显示到列表顶部
        // 清空文本框
        this.content = ''
      } catch (err) {
        console.log(err)
        this.$toast.fail('发布失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
