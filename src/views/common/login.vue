<template>
  <div class="login-container">
    <el-form ref="loginForm"
             :model="loginForm"
             :rules="loginRules"
             class="login-form">
      <div class="title-container">
        <h3 class="title">{{ $config.appName }}</h3>
      </div>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username"
                  placeholder="请输入用户名">
          <SvgIcon slot="prefix"
                   icon="user"></SvgIcon>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password"
                  placeholder="请输入密码"
                  show-password
                  @keyup.enter.native="handleLogin">
          <SvgIcon slot="prefix"
                   icon="password" />
        </el-input>
      </el-form-item>
      <el-button type="primary"
                 style="width:100%"
                 :loading="loading"
                 @click="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      loginForm: { username: '', password: '' },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      loading: false
    }
  },
  methods: {
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('LoginByUsername', this.loginForm)
            .then(res => {
              this.$router.push('/')
              this.$notify({
                title: '登录成功',
                message: '欢迎您 ' + res.username,
                duration: 2000
              })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.login-container {
  height: 100%;
  width: 100%;
  background-color: #2d3a4b;

  .login-form {
    position: relative;
    width: 520px;
    padding: 160px 35px 0;
    margin: 0 auto;
    box-sizing: border-box;

    .title-container .title {
      margin: 0px auto 40px;
      font-size: 26px;
      font-weight: bold;
      color: #eee;
      text-align: center;
    }
  }
}

.login-form >>> .el-form-item {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: #454545;

  .el-input {
    display: inline-block;

    .el-input__prefix {
      margin-left: 4px;
    }

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      color: #eee;
    }
  }
}
</style>
