<template>
  <div class="common-aside">
    <el-menu default-active="4"
             class="el-menu-vertical"
             @open="handleOpen"
             @close="handleClose"
             :collapse="isCollapse"
             background-color="#324157"
             text-color="#bfcbd9"
             active-text-color="#20a0ff"
             unique-opened
             router>
      <el-menu-item index="/dashboard">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="/article">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">文章管理</span>
        </template>
          <el-menu-item index="/article/list">文章列表</el-menu-item>
          <el-menu-item index="/article/publish">发表文章</el-menu-item>
      </el-submenu>
      <el-menu-item index="/user/list">
        <i class="el-icon-setting"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import Bus from './bus.js'
export default {
  name: 'common-aside',
  data () {
    return {
      isCollapse: false,
      items: [{
        index: 'home',
        title: '首页'
      }]
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  created () {
    // 从bus获取状态码 判断侧边栏展开
    Bus.$on('collapse', msg => {
      this.isCollapse = msg
    })
  }
}
</script>

<style scoped lang="stylus">
.common-aside
  display block
  position absolute
  left 0
  top 70px
  bottom 0
  color #fff
  .el-menu-vertical
    height 100%
  .el-menu-vertical:not(.el-menu--collapse)
    width 240px
    min-height 400px
.is-active
  background red
</style>
