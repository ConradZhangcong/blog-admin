import router from '@/router'
import store from '@/store'

// 路由跳转前的操作
router.beforeEach((to, from, next) => {
  const token = store.getters.token ? store.getters.token : sessionStorage.getItem('token')
  if (token) {
    next()
  } else {
    if (to.meta.commonViews) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

// 路由跳转后的操作
router.afterEach((to, from) => {
  window.document.title = to.meta.title
    ? to.meta.title + ' - Conrad的博客管理系统'
    : 'Conrad的博客管理系统'
})
