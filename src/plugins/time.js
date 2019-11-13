import Vue from 'vue'
import moment from 'moment'

moment.locale('zh-cn')

Vue.filter('timeFormat', (data, format = 'HH:mm:ss') => {
  if (data === undefined || data === null || data === '') return ""
  return moment(data).format(format)
})

Vue.filter('dateFormat', (data, format = 'YYYY-MM-DD') => {
  if (data === undefined || data === null || data === '') return ''
  return moment(data).format(format)
})

Vue.filter('datetimeFormat', (data, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (data === undefined || data === null || data === '') return ''
  return moment(data).format(format)
})
