<template>
  <div class="common-header">
    <div class="header-left">
      <div class="btn-collapse"
           @click="handleChangeCollapse">
        <i class="el-icon-menu"></i>
      </div>
      <router-link to="/"
                   class="logo">
        <span>{{ $config.appName }}</span>
      </router-link>
    </div>
    <div class="header-right"
         v-if="user">
      <el-dropdown @command="handleCommand">
        <div class="right-item">
          <img v-if="user.avatar"
               :src="user.avatar"
               class="avatar" />
          <SvgIcon v-else
                   class="avatar"
                   icon="avatar" />
          <span class="username">{{ user.username }}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="userCenter">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout"
                            divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
    handleChangeCollapse () {
      this.$store.dispatch('toggleCollapse')
    },
    handleCommand (command) {
      switch (command) {
        // 退出登录
        case 'logout':
          this.$store.dispatch('Logout').then(() => {
            this.$message({ type: 'success', message: '退出登录!!!' })
            this.$router.push({ path: '/login' })
          })
          break
        default:
          console.log(command)
          break
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.common-header {
  width: 100%;
  height: $HeaderHeight;
  padding: 0 20px;
  background-color: #242f42;
  color: #fff;
  box-sizing: border-box;

  .header-left {
    float: left;
    height: $HeaderHeight;

    .btn-collapse {
      display: inline-block;
      height: $HeaderHeight;
      line-height: $HeaderHeight;

      i {
        padding: 5px;
        cursor: pointer;
      }
    }

    .logo {
      margin-left: 10px;
      color: #fff;
    }
  }

  .header-right {
    float: right;
    height: $HeaderHeight;

    .right-item {
      display: inline-block;
      margin: 10px;
      height: $HeaderHeight - 20px;
      line-height: $HeaderHeight - 20px;
      color: #fff;
      cursor: pointer;

      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 100%;
        vertical-align: middle;
      }

      .username {
        margin-left: 10px;
        font-size: 16px;
      }

      .icon {
        vertical-align: middle;
        font-size: 24px;
      }
    }
  }
}
</style>
