import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zhCn from '@/lang/zh-cn'
import twCn from '@/lang/tw-cn'
import en from '@/lang/en'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh-cn', // 语言标识
  messages: {
    'zh-cn': zhCn,
    'tw-cn': twCn,
    en: en
  }
})

export default i18n
