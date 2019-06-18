<template>
  <div class="common-header">
    <div class="header-left">
      <div class="btn-collapse"
           @click="handleChangeCollapse">
        <i class="el-icon-menu"></i>
      </div>
      <router-link to="/"
                   class="logo">
        <span>{{$config.appName}}</span>
      </router-link>
    </div>
    <div class="header-right"
         v-if="user">
      <div class="right-item full-screen">
        <SvgIcon icon="fullscreen" />
      </div>
      <el-popover class="right-item avatar-container"
                  placement="bottom"
                  width="160"
                  trigger="hover">
        <ul class="hidden">
          <li>个人中心</li>
          <li @click="handleLogout">退出登录</li>
        </ul>
        <div slot="reference">
          <img v-if="user.avatar"
               :src="user.avatar"
               class="avatar">
          <SvgIcon v-else
                   class="avatar"
                   icon="avatar" />
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CommonHeader',
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    // 侧边栏折叠
    handleChangeCollapse () { this.$store.dispatch('toggleCollapse') },
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
    float left
    height $HeaderHeight
    .btn-collapse
      display inline-block
      height $HeaderHeight
      line-height $HeaderHeight
      i
        padding 5px
        cursor pointer
    .logo
      margin-left 10px
      color #fff
  .header-right
    float right
    height $HeaderHeight
    .right-item
      display inline-block
      margin-left 10px
      height $HeaderHeight
      line-height $HeaderHeight
    .full-screen
    .avatar-container
      position relative
      display inline-block
      cursor pointer
      .avatar
        width 40px
        height 40px
        border-radius 100%
        vertical-align middle
.hidden
  li
    list-style none
    padding 5px 0
    margin-top 5px
    &:hover
      background-color #ecf5ff
      color #66b1ff
      cursor pointer
</style>
