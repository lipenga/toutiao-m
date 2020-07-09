<template>
  <div class="comment-reply">
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <!-- 当前评论项 -->
    <commentItem :comment="comment" />
    <!-- 评论的回复列表 -->
    <van-cell title="全部回复" />
    <Artcomment :source="comment.com_id" type="c" />
  </div>
</template>

<script>
import commentItem from './ARTitem'
import Artcomment from './ARTcomment'
export default {
  name: 'reply',
  components: { commentItem, Artcomment },
  props: {
    comment: {
      type: [Number, String, Object],
      required: true
    }
  }
}
</script>

<style></style>
