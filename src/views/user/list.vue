<template>
  <div class="content-container user-list">
    <el-row>
      <el-form :inline="true"
               :model="searchForm">
        <el-form-item label="关键词">
          <el-input v-model="searchForm.keywords"
                    clearable
                    placeholder="请输入关键词"></el-input>
        </el-form-item>
        <el-form-item label="用户类型">
          <el-select v-model="searchForm.userType"
                     clearable
                     placeholder="请选择用户类型">
            <el-option label="管理员"
                       value="99"></el-option>
            <el-option label="用户"
                       value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     size="medium"
                     @click="getList">查询</el-button>
          <el-button type="primary"
                     size="medium"
                     @click="createUserDialog = true">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table :data="list"
              border>
      <el-table-column prop="username"
                       label="用户名"
                       align="center"></el-table-column>
      <el-table-column prop="phone"
                       label="手机号"
                       align="center"></el-table-column>
      <el-table-column prop="email"
                       label="邮箱"
                       align="center"></el-table-column>
      <el-table-column prop="userType"
                       label="用户类型"
                       :formatter="userTypeFormat"
                       align="center"
                       width="100">
      </el-table-column>
      <el-table-column prop="createdAt"
                       label="创建日期"
                       width="170"
                       align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt | datetimeFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right"
                       align="center"
                       width="200"
                       label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="primary"
                     @click="$router.push({ path: 'detail/' + scope.row.id })">查看详情</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="deleteUser(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-if="total > 0"
                :total="total"
                :page.sync="listQuery.page"
                :size.sync="listQuery.size"
                @pagination="getList"></pagination>
    <!-- 创建用户 -->
    <CreateUser :showDialog.sync="createUserDialog"
                @create-user="createUser" />
  </div>
</template>

<script>
import { getUserList, createUser, deleteUser } from '@/api/user'
import Pagination from '@/components/Pagination'
import CreateUser from './components/CreateUser'
export default {
  name: 'UserList',
  data () {
    return {
      list: [], // 数据列表
      total: 0, // 数据总数
      listQuery: { page: 1, size: 10 }, // 分页参数
      searchForm: { keywords: '', userType: '1' }, // 搜索表单
      createUserDialog: false // 新建窗口显示
    }
  },
  methods: {
    // 新增用户
    createUser (params) {
      createUser(params).then(res => {
        this.$message({ type: 'success', message: '新增成功!!!' })
        this.getList()
      })
    },
    // 删除用户
    deleteUser (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser({ id }).then(res => {
          this.$message({ type: 'success', message: '删除成功!!!' })
          this.getList()
        })
      })
    },
    // 获取用户列表
    getList () {
      getUserList({ ...this.listQuery, ...this.searchForm }).then(res => {
        this.list = res.data
        this.total = res.total
      })
    },
    /* 格式化 */
    // 用户类型
    userTypeFormat (row, column) {
      const userType = row[column.property]
      const userTypeList = { 1: '用户', 99: '管理员' }
      return userTypeList[userType]
    }
  },
  created () {
    this.getList()
  },
  components: { Pagination, CreateUser }
}
</script>
