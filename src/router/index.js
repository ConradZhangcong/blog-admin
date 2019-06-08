import Vue from 'vue'
import Router from 'vue-router'
// Layout
import Layout from '@/views/layout/layout.vue'

Vue.use(Router)

export const staticRoutes = [
  {
    path: '/login',
    component: () => import('@/views/common/login.vue'),
    meta: { title: '登录', commonViews: true }
  },
  {
    path: '/404',
    component: () => import('@/views/common/404.vue'),
    meta: { title: '找不到页面了', commonViews: true }
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
        component: () => import('@/views/dashboard/dashboard.vue'),
        meta: { title: '首页' }
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
        path: 'publish',
        name: 'ArticlePublish',
        component: () => import('@/views/article/detail.vue'),
        meta: { title: '发表文章' }
      },
      {
        path: 'edit/:id',
        name: 'ArticleEdit',
        component: () => import('@/views/article/detail.vue'),
        meta: { title: '编辑文章' },
        hidden: true
      },
      {
        path: 'comment',
        name: 'ArticleComment',
        component: () => import('@/views/article/comment.vue'),
        meta: { title: '评论列表' }
      }
    ]
  },
  {
    path: '/category',
    component: Layout,
    redirect: '/category/list',
    meta: { title: '分类管理', icon: 'component' },
    children: [
      {
        path: 'list',
        name: 'ArticleCategory',
        component: () => import('@/views/category/list.vue'),
        meta: { title: '类别管理' }
      },
      {
        path: 'tag',
        name: 'ArticleTag',
        component: () => import('@/views/category/tag.vue'),
        meta: { title: '标签管理' }
      }
    ]
  },
  {
    path: '/doc',
    component: Layout,
    redirect: '/doc/list',
    meta: { title: '文档', icon: 'doc' },
    children: [
      {
        path: 'list',
        name: 'DocList',
        component: () => import('@/views/doc/list.vue'),
        meta: { title: '文档' }
      }
    ]
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [...staticRoutes, ...asyncRoutes]
})

export default router
