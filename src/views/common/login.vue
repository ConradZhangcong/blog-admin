<template>
  <div class="login-container">
    <el-form ref="loginForm"
             :model="loginForm"
             :rules="loginRules"
             class="login-form">
      <div class="title-container">
        <h3 class="title">KEBK</h3>
      </div>
      <el-form-item style="position:relative"
                    prop="username">
        <span class="svg-container">
          <SvgIcon icon="user" />
        </span>
        <el-input v-model="loginForm.username"
                  placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <SvgIcon icon="password" />
        </span>
        <el-input v-model="loginForm.password"
                  placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-button type="primary"
                 style="width:100%"
                 @click="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('LoginByUsername', this.loginForm)
            .then(res => {
              this.$router.push('/')
              this.$notify({
                title: '登录成功',
                message: '欢迎您 ' + res.username
              })
            })
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.login-container
  height 100%
  width 100%
  background-color #2d3a4b
  .login-form
    position relative
    width 520px
    padding 160px 35px 0
    margin 0 auto
    box-sizing border-box
    .title-container .title
      margin 0px auto 40px
      font-size 26px
      font-weight bold
      color #eee
      text-align center
    .svg-container
      display inline-block
      padding-left 15px
      box-sizing border-box
      color #889aa4
      font-size 16px
.login-form >>> .el-form-item
  border 1px solid rgba(255, 255, 255, 0.1)
  background rgba(0, 0, 0, 0.1)
  border-radius 5px
  color #454545
  .el-input
    display inline-block
    height 47px
    width 85%
    input
      background transparent
      border 0px
      -webkit-appearance none
      border-radius 0px
      padding 12px 5px 12px 15px
      color #eee
      height 47px
      caret-color #fff
.btn-code
  position absolute
  top 3px
  right -125px
</style>
