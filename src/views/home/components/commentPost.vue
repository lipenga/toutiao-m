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
    },
    repId: {
      type: [Number, String, Object],
      default: null
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
      this.$toast.loading({
        message: '发布中',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      })
      try {
        const { data } = await postComment({
          target: this.target.toString(),
          content: this.content,
          art_id: this.repId ? this.repId.toString() : null
        })

        // 清空文本框
        this.content = ''
        this.$toast.success('发布成功')
        this.$emit('successpost', data.data)
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
