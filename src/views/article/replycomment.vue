<template>
  <div class="comment-reply">
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <div class="middle">
      <!-- 当前评论项 -->
      <commentItem :comment="comment" />
      <!-- 评论的回复列表 -->
      <van-cell title="全部回复" />
      <Artcomment :source="comment.com_id" :list="commentList" type="c" />
    </div>
    <div class="post-wrap">
      <van-button class="post-btn" size="small" round @click="isPopShow = true"
        >写评论
      </van-button>
    </div>
    <!-- 发布评论 -->
    <van-popup v-model="isPopShow" position="bottom"
      ><commentPost
        :target="comment.com_id"
        :repId="this.repId"
        @successpost="onsuccess"
    /></van-popup>
  </div>
</template>

<script>
import commentItem from './ARTitem'
import Artcomment from './ARTcomment'
import commentPost from '@/views/home/components/commentPost.vue'
export default {
  name: 'reply',
  data() {
    return {
      isPopShow: false,
      commentList: []
    }
  },
  components: { commentItem, Artcomment, commentPost },
  props: {
    comment: {
      type: [Number, String, Object],
      required: true
    },
    repId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    onsuccess(data) {
      this.comment.reply_count++
      // 将发布内容显示到列表顶部
      this.commentList.unshift(data.new_obj)
      // 关闭弹出层
      this.isPopShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  .post-btn {
    width: 60%;
    color: red;
    background-color: royalblue;
  }
}
.middle {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
</style>
