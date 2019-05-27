<template>
  <div class="user-detail">
    <el-row>
      <el-button style="margin-bottom:22px;"
                 type="primary"
                 round
                 @click="$router.go(-1)">返回用户列表</el-button>
    </el-row>
    <el-form :model="userDetail"
             :rules="rules"
             ref="userDetail"
             label-width="80px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名"
                        prop="username">
            <el-input v-model="userDetail.username"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="邮箱"
                        prop="email">
            <el-input v-model="userDetail.email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="密码"
                        prop="password">
            <el-input v-model="userDetail.password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">

        <el-col :span="8">
          <el-form-item label="是否封禁"
                        prop="isBlock">
            <el-radio-group v-model="userDetail.isBlock">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户类型"
                        prop="userType">
            <el-select v-model="userDetail.userType"
                       placeholder="请选择用户类型">
              <el-option label="用户"
                         value="1"></el-option>
              <el-option label="管理员"
                         value="99"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary"
                   @click="handleSave">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUserById } from '@/api/user'
export default {
  name: 'UserDetail',
  data () {
    return {
      id: 0,
      userDetail: {},
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        isBlock: [{ required: true, message: '请选择是否封禁', trigger: 'blur' }],
        userType: [{ required: true, message: '请选择用户类型', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.id = this.$route.params.id
    getUserById(this.id).then(res => {
      this.userDetail = res.data
    })
  },
  methods: {
    // 保存用户信息
    handleSave () {
      this.$refs['detailForm'].validate((valid) => {
        if (valid) {
          console.log({ id: this.id, ...this.detailForm })
        }
      })
    }
  }
}
</script>

<style>
</style>
