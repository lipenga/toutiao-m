import dayjs from 'dayjs'
import Vue from 'vue'

import 'dayjs/locale/zh-cn'
// dayjs 默认语言是英文。我们这里配置为中文

import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn') // p配置全局使用
// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
