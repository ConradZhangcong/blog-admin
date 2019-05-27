import Vue from 'vue'
import Router from 'vue-router'
// Layout
import Layout from '@/views/layout/layout.vue'

Vue.use(Router)

export const staticRoutes = [
  {
    path: '/login',
    component: () => import('@/views/common/login.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/404',
    component: () => import('@/views/common/404.vue'),
    meta: { title: '找不到页面了' }
  }
]

export const asyncRoutes = [
  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: '首页', icon: 'dashboard' },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/dashboard.vue')
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    meta: { title: '用户管理', icon: 'user' },
    children: [
      {
        path: 'list',
        name: 'UserList',
        component: () => import('@/views/user/list.vue'),
        meta: { title: '用户列表' }
      },
      {
        path: 'detail/:id',
        name: 'UserDetail',
        component: () => import('@/views/user/detail.vue'),
        meta: { title: '用户详情' },
        hidden: true
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/list',
    meta: { title: '文章管理', icon: 'article' },
    children: [
      {
        path: 'list',
        name: 'ArticleList',
        component: () => import('@/views/article/list.vue'),
        meta: { title: '文章列表' }
      },
      {
        path: 'comment',
        name: 'ArticleComment',
        component: () => import('@/views/article/comment.vue'),
        meta: { title: '评论列表' }
      },
      {
        path: 'publish',
        name: 'ArticlePublish',
        component: () => import('@/views/article/publish.vue'),
        meta: { title: '发表文章' }
      },
      {
        path: 'edit/:id',
        name: 'ArticleEdit',
        component: () => import('@/views/article/edit.vue'),
        meta: { title: '编辑文章' },
        hidden: true
      }
    ]
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [...staticRoutes, ...asyncRoutes]
})

// 路由跳转前的操作
router.beforeEach((to, from, next) => {
  // const token = store.getter.token?store.getter.token:sessionStorage.getItem('token')
  // if(token)
  next()
})

// 路由跳转后的操作
router.afterEach((to, from) => {
  window.document.title = to.meta.title
    ? to.meta.title + ' - Conrad的博客管理系统'
    : 'Conrad的博客管理系统'
})

export default router
