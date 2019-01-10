import Vue from 'vue'
import Router from 'vue-router'

import Layout from 'views/common/layout'
// import Redirect from 'views/common/redirect'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    //   {
    //   path: '/redirect',
    //   component: Layout,
    //   children: [{
    //     path: '/redirect/:path*',
    //     component: Redirect
    //   }]
    // },
    {
      path: '',
      component: Layout,
      redirect: '/dashboard',
      children: [{
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('views/dashboard/dashboard.vue'),
        meta: {
          title: '首页'
        }
      }]
    },
    {
      path: '/article',
      component: Layout,
      children: [{
        path: 'list',
        name: 'articleList',
        component: () => import('views/article/list.vue'),
        meta: {
          title: '文章列表'
        }
      }, {
        path: 'publish',
        name: 'articlePublish',
        component: () => import('views/article/publish.vue'),
        meta: {
          title: '发表文章'
        }
      }, {
        path: 'edit',
        name: 'articleEdit',
        component: () => import('views/article/edit.vue'),
        meta: {
          title: '编辑文章'
        }
      }]
    },
    {
      path: '/user',
      component: Layout,
      children: [{
        path: 'list',
        name: 'userList',
        component: () => import('views/user/list.vue'),
        meta: {
          title: '用户列表'
        }
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('views/common/login.vue'),
      meta: {
        title: '登录'
      }
    }
    // {
    //   path: '*',
    //   component: () => import('views/404.vue'),
    //   beforeEnter: (to, from, next) => {
    //     next()
    //   },
    //   meta: {
    //     title: '404'
    //   }
    // }
  ]
})

// 路由跳转后的操作
router.afterEach((to, from) => {
  // 改变title
  if (to.meta.title) {
    window.document.title = to.meta.title + ' - Conrad的博客管理系统'
  } else {
    window.document.title = 'Conrad的博客管理系统'
  }
})

export default router
