<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">
          {{ article.title }}
        </h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <!-- 监听状态改变
             @changestatus="article.is_followed = $event"
             传递状态
            :isfollowed="article.is_followed" -->
          <btn
            v-model="article.is_followed"
            :userID="article.aut_id"
            class="follow-btn"
          />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          ref="article-content"
          v-html="article.content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 文章评论 -->
        <ArticleComment
          :source="article.art_id"
          :list="commentList"
          @getSuccess="commentCount = $event.total_count"
          @reply-click="onReplyClick"
        />
        <!-- 底部区域 -->
        <div class="article-bottom">
          <!-- 发布评论弹出层 -->
          <van-popup v-model="popshow" position="bottom">
            <commentpost :target="article.art_id" @successpost="onPopSuccess" />
          </van-popup>
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="popshow = true"
            >写评论</van-button
          >
          <van-icon name="comment-o" :info="commentCount" color="#777" />

          <collect
            class="btn-item"
            v-model="article.is_collected"
            :collectID="article.art_id"
          />
          <like
            class="btn-item"
            v-model="article.attitude"
            :articleId="article.art_id"
          />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- /底部区域 -->
    <!-- 评论回复 -->
    <van-popup
      v-if="repshow"
      v-model="repshow"
      position="bottom"
      style="height:100%"
    >
      <replycomment
        :comment="currentComment"
        @close="closePop"
        :repId="article.art_id"
      />
    </van-popup>
  </div>
</template>

<script>
import { getOneArticle } from '@/api/user.js'
import { ImagePreview } from 'vant'
import btn from '@/views/home/components/addfollow.vue'
import collect from '@/views/home/components/collect.vue'
import like from '@/views/home/components/likeArticle.vue'
import ArticleComment from '@/views/article/ARTcomment.vue'
import commentpost from '@/views/home/components/commentPost.vue'
import replycomment from '@/views/article/replycomment.vue'
// 预览
// ImagePreview({
//   images: [],
//   startPosition: 1,
//   onClose() {
//     // do something
//     console.log(666)
//   }
// })
export default {
  name: 'ArticleIndex',
  components: { btn, collect, like, ArticleComment, commentpost, replycomment },
  data() {
    return {
      article: {},
      loading: true,
      errStatus: 0,
      commentCount: 0,
      popshow: false,
      repshow: false,
      commentList: [],
      currentComment: {}
    }
  },
  props: {
    articleID: {
      type: [Number, String, Object],
      required: true
    }
  },
  created() {
    this.loadArticle()
  },
  methods: {
    // 获取文章信息
    async loadArticle() {
      try {
        const { data } = await getOneArticle(this.articleID)
        // 数据驱动视图这件事儿不是立即的
        this.article = data.data

        // 初始化图片点击预览
        setTimeout(() => {
          this.previewImage()
        }, 0)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
        console.log('获取数据失败')
      }
      this.loading = false
    },
    previewImage() {
      // 得到所有的img节点
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.src)
        img.onclick = () => {
          ImagePreview({
            images,
            // 起始位置，从0开始
            startPosition: index
          })
        }
      })
    },
    onPopSuccess(data) {
      // 将发布内容显示到列表顶部
      this.commentList.unshift(data.new_obj)
      // 关闭弹出层
      this.popshow = false
    },
    // 点击回复弹出层onReplyClick
    onReplyClick(comment) {
      console.log(comment)
      this.currentComment = comment
      this.repshow = true
    },
    closePop() {
      this.repshow = false
    }
  }
}
</script>

<style scoped lang="less">
@import '~@/style/github-markdown.css';

.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
