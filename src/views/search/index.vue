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
      />
    </form>
    <result v-if="this.showResult" :searchvalue="searchText"></result>
    <suggess
      v-else-if="searchText"
      :searchvalue="searchText"
      @search="onSearch"
    >
    </suggess>
    <history v-else></history>
  </div>
</template>

<script>
import suggess from './suggess.vue'
import result from './searchresult.vue'
import history from './history.vue'

export default {
  name: 'searchIndex',
  data() {
    return {
      searchText: '',
      showResult: false
    }
  },
  components: { suggess, history, result },
  methods: {
    //   点击回车搜索
    async onSearch(val) {
      this.showResult = true
      console.log(val)
      this.searchText = val
      // try {
      //   const { data } = await getresults(val)
      //   console.log(data)
      //   this.resultsList = data.data.results.title
      // } catch (err) {}
    },
    onCancel() {
      this.$router.back()
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
