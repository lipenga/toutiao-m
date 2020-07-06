<template>
  <div>
    <!-- 搜索历史 -->
    <van-cell title="搜索历史" size="large">
      <div v-if="showDelete">
        <span @click="alldel">全部删除</span> &nbsp;&nbsp;<span
          @click="showDelete = false"
          >完成</span
        >
      </div>
      <van-icon v-else name="delete" @click="showDelete = true" />
    </van-cell>
    <!-- 历史内容 -->

    <van-cell
      :title="item"
      v-for="(item, i) in searchhistory"
      :key="i"
      @click="addordelete(item, i)"
      ><van-icon name="close" v-if="showDelete" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchhistory: {
      type: Array,
      required: true
    }
  },
  data() {
    return { showDelete: false }
  },
  methods: {
    // 全部删除
    alldel() {
      this.searchhistory.splice(0, this.searchhistory.length)
    },
    // 删除单个历史
    addordelete(item, i) {
      if (this.showDelete === false) {
        //  非删除状态
        this.$emit('additem', item)
      } else {
        //  删除状态
        this.searchhistory.splice(i, 1)
      }
    }
  }
}
</script>

<style></style>
