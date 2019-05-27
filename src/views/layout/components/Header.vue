<template>
  <div class="common-header">
    <div class="header-left">
      <div class="btn-collapse"
           @click="handleChangeCollapse">
        <i class="el-icon-menu"></i>
      </div>
      <router-link to="/"
                   class="logo">
        <span>Conrad的博客管理系统</span>
      </router-link>
    </div>
    <div class="header-right">
      <a class="btn-logout"
         href="javascript:;"
         @click="handleLogout">退出登录</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonHeader',
  data () {
    return {
      collapse: false
    }
  },
  methods: {
    handleChangeCollapse () {
      // TODO:侧边栏折叠
    },
    handleLogout () {
      // TODO:退出登录
    }
  }
}
</script>

<style scoped lang="stylus">
.common-header
  width 100%
  height $HeaderHeight
  padding 0 20px
  background-color #242f42
  color #fff
  box-sizing border-box
  .header-left
    display flex
    align-items center
    float left
    height $HeaderHeight
    .btn-collapse
      display inline-block
      cursor pointer
    .logo
      margin-left 20px
      color #fff
  .header-right
    float right
    height $HeaderHeight
    .btn-logout
      line-height $HeaderHeight
      color #fff
      &:hover
        color $menuHover
</style>
