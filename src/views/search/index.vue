<template>
  <div class="search-container">
    <form action="/" id="searchHead">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#308ffe"
        @focus="back"
      />
    </form>
    <result v-if="this.showResult" :searchvalue="searchText"></result>
    <suggess
      v-else-if="searchText"
      :searchvalue="searchText"
      @search="onSearch"
    >
    </suggess>
    <history
      v-else
      :searchhistory="searchHistories"
      @additem="onSearch"
    ></history>
  </div>
</template>

<script>
import suggess from './suggess.vue'
import result from './searchresult.vue'
import history from './history.vue'
import { setItem, getItem } from '@/utils/storage.js'

export default {
  name: 'searchIndex',
  data() {
    return {
      searchText: '',
      showResult: false,
      searchHistories: getItem('SEARCH-HISTORY') || []
    }
  },
  components: { suggess, history, result },
  methods: {
    back() {
      this.showResult = false
    },
    //   点击回车搜索
    onSearch(val) {
      this.searchText = val
      const i = this.searchHistories.indexOf(val)
      if (i !== -1) {
        this.searchHistories.splice(i, 1)
      }
      this.searchHistories.unshift(val)
      this.showResult = true
    },
    onCancel() {
      this.$router.back()
    }
  },
  watch: {
    searchHistories(val) {
      setItem('SEARCH-HISTORY', val)
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 100px;
}
#searchHead {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
}
</style>
