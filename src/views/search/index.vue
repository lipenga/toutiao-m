<template>
  <div>
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#308ffe"
      />
      <result v-if="this.showResult"></result>
      <suggess v-else-if="searchText" :searchvalue="searchText"> </suggess>
      <history v-else></history>
    </form>
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
    onSearch() {
      this.showResult = true
    },
    onCancel() {
      this.$router.back()
    }
  }
}
</script>

<style>
</style>
