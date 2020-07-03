<template>
  <div>
    <!-- // 我的频道头部 -->
    <van-cell-group>
      <van-cell class="my_tv_top">
        <span slot="title">我的频道</span>
        <span slot="default" class="my_tv_top_edit" @click="flag = !flag">{{
          flag ? '完成' : '编辑'
        }}</span>
      </van-cell>
    </van-cell-group>
    <!-- 我的频道内容 -->
    <div>
      <van-grid :gutter="10" id="gridtable">
        <van-grid-item
          class="text"
          :class="{ active: index === active }"
          v-for="(item, index) in mychannels"
          :key="index"
          @click="clickMyChannel(item, index)"
        >
          <van-icon
            class="icon"
            slot="icon"
            name="clear"
            v-show="flag && !fiexchannels.includes(item.id)"
          ></van-icon>
          <span slot="text">{{ item.name }}</span>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 频道推荐头部 -->
    <van-cell-group>
      <van-cell>
        <span slot="title">频道推荐</span>
      </van-cell>
    </van-cell-group>
    <!-- 频道推荐主体 -->
    <div class="tv-hot">
      <van-grid :gutter="10" id="gridtable2">
        <van-grid-item
          class="tv_btn"
          v-for="(channel, i) in losechannels"
          :key="i"
          :text="channel.name"
          icon="plus"
          @click="addchannel(channel)"
        />
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getalllist, editUserChannels, delUserChannels } from '@/api/user.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'
export default {
  name: 'channel-edit',
  props: ['mychannels', 'active'],
  data() {
    return {
      allchannels: [], // 所有频道列表
      flag: false,
      fiexchannels: [0]
    }
  },
  created() {
    this.load()
  },
  methods: {
    //   获取全部标签
    async load() {
      try {
        const { data } = await getalllist()
        // console.log(data.data.channels)
        this.allchannels = data.data.channels
      } catch (err) {
        console.log('获取失败')
      }
    },
    // 点击标签添加
    async addchannel(channel) {
      this.mychannels.push(channel)
      // 数据持久化处理
      if (this.user) {
        // 已经登陆
        try {
          await editUserChannels({
            id: channel.id,
            seq: this.mychannels.length
          })

          //   this.mychannels.push(res)
        } catch (err) {
          this.$toast('保存失败', err)
        }
      } else {
        // 未登录
        setItem('TOUTIAO_CHANNELS', this.mychannels)
      }
    },
    // 点击我的标签
    async clickMyChannel(item, index) {
      console.log(item, index)
      if (this.flag) {
        // 编辑状态,点击标签删除。
        // 登陆了的删除
        if (this.user) {
          try {
            const res = await delUserChannels(item.id)
            console.log(res)
          } catch (err) {
            this.$toast('删除失败', err)
          }
        } else {
          // 未登陆的删除
          setItem('TOUTIAO_CHANNELS', this.mychannels)
        }
        // 不能删除推荐标签
        if (this.fiexchannels.includes(item.id)) {
          return
        }

        if (index <= this.active) {
          this.$emit('updataActive', this.active - 1, true)
        }
        this.mychannels.splice(index, 1)
      } else {
        // 非编辑状态，点击跳转
        this.$emit('updataActive', index, false)
      }
    }
  },
  computed: {
    ...mapState(['user']),
    //   定义剩下得推荐频道
    losechannels() {
      const channels = []
      //   循环所有频道
      this.allchannels.forEach(item => {
        // 从所有频道中通过id挑选出已选中频道
        const ret = this.mychannels.find(mychannel => {
          return mychannel.id === item.id
        })
        //   未选择
        if (!ret) {
          channels.push(item)
        }
      })
      return channels
    }
  }
}
</script>

<style lang="less" scoped>
.my_tv_top {
  margin-top: 100px;
  font-weight: 700;
  .my_tv_top_edit {
    display: inline-block;
    width: 100px;
    height: 50px;
    border: 1px red solid;
    border-radius: 25px;
    color: red;
    text-align: center;
  }
}

/deep/.van-icon-plus::before {
  content: '\F0A2';
  font-size: 0.533rem;
  line-height: 0.8333rem;
  margin-right: 15px;
}
/deep/ .van-icon-clear {
  position: absolute;
  right: -8px;
  top: -10px;
  font-size: 35px;
  color: #cacaca;
  z-index: 2;
}
.active {
  color: red;
}
.icon {
  position: absolute;
  right: -01.2667rem;
  top: -0.32rem;
}
</style>
