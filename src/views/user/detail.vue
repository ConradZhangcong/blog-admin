<template>
  <div class="content-container user-detail">
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
      <el-row>
        <el-col :xs="24" :sm="10" :md="8" :lg="5" :xl="3">
          <el-upload class="avatar-uploader"
                     action="http://localhost:9705/api/v1/upload/avatar"
                     accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                     :show-file-list="false"
                     :on-success="handleAvatarSuccess"
                     :before-upload="beforeAvatarUpload">
            <img v-if="userDetail.avatar"
                 :src="userDetail.avatar"
                 class="avatar">
            <i v-else
               class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
        <el-col :xs="24" :sm="14" :md="16" :lg="19" :xl="21">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <el-form-item label="用户名"
                            prop="username">
                <el-input v-model="userDetail.username"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <el-form-item label="邮箱"
                            prop="email">
                <el-input v-model="userDetail.email"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <el-form-item label="密码"
                            prop="password">
                <el-input v-model="userDetail.password"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="是否封禁"
                            prop="isBlock">
                <el-radio-group v-model="userDetail.isBlock">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <el-form-item label="用户类型"
                            prop="userType">
                <el-select v-model="userDetail.userType"
                           placeholder="请选择用户类型">
                  <el-option label="用户"
                             :value="1"></el-option>
                  <el-option label="管理员"
                             :value="99"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-form-item style="margin-top:22px">
        <el-button type="primary"
                   @click="handleSave">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUserById, updateUser } from '@/api/user'
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
      },
      imageUrl: ''
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
      this.$refs['userDetail'].validate((valid) => {
        if (valid) {
          updateUser({ id: this.id, ...this.userDetail })
            .then(res => {
              this.$message({ type: 'success', message: '保存成功' })
            })
        }
      })
    },
    handleAvatarSuccess (res, file) {
      if (res.code === 200) {
        this.$message({ type: 'success', message: '上传成功' })
        this.userDetail.avatar = res.data.url
      } else {
        this.$message({ type: 'error', message: res.msg })
      }
    },
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    }
  }
}
</script>

<style scoped lang="stylus">
.avatar-uploader
  margin-bottom 20px
  .avatar-uploader-icon
    font-size 28px
    color #8c939d
    width 178px
    height 178px
    line-height 178px
    text-align center
  .avatar
    width 178px
    height 178px
    display block
.avatar-uploader >>> .el-upload
  display block
  width 178px
  margin 0 auto
  border 1px dashed #d9d9d9
  border-radius 6px
  cursor pointer
  position relative
  overflow hidden
  transition border-color 0.2s
  &:hover
    border-color #409EFF
</style>
