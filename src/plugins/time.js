import Vue from 'vue'
import moment from 'moment'

moment.locale('zh-cn')

Vue.filter('dateFormat', (data, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (data === undefined) return ''
  return moment(data).format(format)
})
