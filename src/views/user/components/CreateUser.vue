<template>
  <el-dialog title="新增用户"
             :visible.sync="showDialog"
             :close-on-click-modal="false"
             :before-close="closeDialog">
    <el-form :model="createForm"
             :rules="rules"
             ref="createForm"
             label-width="80px">
      <el-form-item label="用户名"
                    prop="username">
        <el-input v-model="createForm.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱"
                    prop="email">
        <el-input v-model="createForm.email"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="password">
        <el-input v-model="createForm.password"></el-input>
      </el-form-item>
      <el-form-item label="用户类型"
                    prop="userType">
        <el-select v-model="createForm.userType"
                   placeholder="请选择用户类型">
          <el-option label="用户"
                     value="1"></el-option>
          <el-option label="管理员"
                     value="99"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="medium"
                   type="primary"
                   @click="handleSubmit">立即创建</el-button>
        <el-button size="medium"
                   @click="closeDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'CreateUser',
  data () {
    return {
      createForm: {
        username: '',
        email: '',
        password: '123456',
        userType: '1'
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        userType: [{ required: true, message: '请选择用户类型', trigger: 'blur' }]
      }
    }
  },
  props: {
    showDialog: { type: Boolean, default: false }
  },
  methods: {
    closeDialog () {
      this.$emit('update:showDialog', false)
      this.$refs['createForm'].resetFields()
    },
    handleSubmit () {
      this.$refs['createForm'].validate((valid) => {
        if (valid) {
          this.$emit('create-user', { ...this.createForm })
          this.closeDialog()
        }
      })
    }
  }
}
</script>
