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
      <span v-if="user">{{user.username}}</span>
      <a class="btn-logout"
         href="javascript:;"
         @click="handleLogout">退出登录</a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CommonHeader',
  data () {
    return {
      collapse: false
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    // 侧边栏折叠
    handleChangeCollapse () {
      this.$store.dispatch('toggleCollapse')
    },
    // 退出登录
    handleLogout () {
      this.$store.dispatch('Logout')
        .then(() => {
          this.$message({ type: 'success', message: '退出登录!!!' })
          this.$router.push({ path: '/login' })
        })
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
