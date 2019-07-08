<template>
  <el-dialog :visible.sync="showDialog"
             :close-on-click-modal="false"
             :before-close="closeDialog">
    <div slot="title">封禁用户 {{blockForm.username}}</div>
    <el-form :model="blockForm"
             :rules="rules"
             ref="blockForm"
             label-width="80px">
      <el-form-item label="永久封禁"
                    prop="isPermanent">
        <el-switch v-model="blockForm.isPermanent"></el-switch>
      </el-form-item>
      <el-form-item v-if="!blockForm.isPermanent"
                    label="解封日期"
                    prop="blockTime">
        <el-date-picker v-model="blockForm.blockTime"
                        type="datetime"
                        placeholder="选择日期时间"
                        align="right"
                        :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="原因"
                    prop="reason">
        <el-input v-model="blockForm.reason"
                  type="textarea"
                  placeholder="选择输入原因"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small"
                   type="primary"
                   @click="handleSubmit">封禁</el-button>
        <el-button size="small"
                   @click="closeDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'BlockUser',
  data () {
    const timeList = [
      { text: '1天', time: 1 }, { text: '3天', time: 3 }, { text: '7天', time: 7 }, { text: '15天', time: 15 },
      { text: '30天', time: 30 }, { text: '90天', time: 90 }, { text: '180天', time: 180 }, { text: '360天', time: 360 }
    ]
    const shortcuts = []
    for (let i of timeList) {
      let obj = {
        text: i.time + '天',
        onClick (picker) {
          const date = new Date()
          date.setTime(date.getTime() + 3600 * 1000 * 24 * i.time)
          picker.$emit('pick', date)
        }
      }
      shortcuts.push(obj)
    }
    var checkBlockTime = (rule, value, callback) => {
      if (value.getTime() < new Date().getTime()) {
        callback(new Error('解封时间不能早于当前时间'))
      } else {
        callback()
      }
    }
    return {
      pickerOptions: { shortcuts },
      rules: {
        reason: [{ required: true, message: '请输入封禁原因', trigger: 'blur' }],
        blockTime: [{ required: true, message: '请选择封禁时间', trigger: ['blur', 'change'] }, { validator: checkBlockTime, trigger: 'blur' }]
      }
    }
  },
  props: {
    showDialog: { type: Boolean, default: false },
    blockForm: { type: Object, default: () => ({ id: '', username: '', isPermanent: false, reason: '', blockTime: null }) }
  },
  methods: {
    closeDialog () {
      this.$emit('update:showDialog', false)
      this.$refs['blockForm'].resetFields()
      this.$nextTick(() => {
        this.$refs['blockForm'].clearValidate()
      })
    },
    handleSubmit () {
      this.$refs['blockForm'].validate((valid) => {
        if (valid) {
          const data = Object.assign({}, this.blockForm)
          if (data.blockTime) data.blockTime = this.blockForm.blockTime.getTime()
          this.$emit('block-user', data)
          this.closeDialog()
        }
      })
    }
  }
}
</script>
