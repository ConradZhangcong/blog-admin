<template>
  <div class="content-container user-list">
    <el-row>
      <el-form :inline="true"
               :model="searchForm">
        <el-form-item label="关键词">
          <el-input v-model="searchForm.keywords"
                    placeholder="请输入关键词"></el-input>
        </el-form-item>
        <el-form-item label="用户类型">
          <el-select v-model="searchForm.userType"
                     placeholder="请选择用户类型">
            <el-option value=""></el-option>
            <el-option label="管理员"
                       value="99"></el-option>
            <el-option label="用户"
                       value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否封禁">
          <el-select v-model="searchForm.isBlock"
                     placeholder="请选择是否封禁">
            <el-option value=""></el-option>
            <el-option label="是"
                       value="1"></el-option>
            <el-option label="否"
                       value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     size="medium"
                     @click="getList">查询</el-button>
          <el-button type="primary"
                     size="medium"
                     @click="showDialog=true">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table :data="list"
              border>
      <el-table-column type="index"
                       width="50"
                       align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover"
                      placement="top-start">
            <p>id: {{scope.row.id}}</p>
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium">{{scope.$index+1}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="username"
                       label="用户名"
                       align="center">
      </el-table-column>
      <el-table-column prop="email"
                       label="邮箱"
                       align="center">
      </el-table-column>
      <el-table-column prop="userType"
                       label="用户类型"
                       :formatter="userTypeFormat"
                       align="center"
                       width="100">
      </el-table-column>
      <el-table-column prop="isBlock"
                       :formatter="isBlockFormat"
                       align="center"
                       width="100"
                       label="是否封禁">
      </el-table-column>
      <el-table-column prop="createdAt"
                       label="创建日期"
                       width="170"
                       align="center">
        <template slot-scope="scope">
          <span>{{scope.row.createdAt|dateFormat}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt"
                       align="center"
                       width="170"
                       label="修改日期">
        <template slot-scope="scope">
          <span>{{scope.row.updatedAt|dateFormat}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right"
                       align="center"
                       width="300"
                       label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="primary"
                     @click="$router.push({ path: 'detail/' + scope.row.id })">查看详情</el-button>
          <el-button v-if="scope.row.isBlock"
                     size="mini"
                     type="success"
                     @click="handleBlock(0,scope.row.id)">解封</el-button>
          <el-button v-else
                     size="mini"
                     type="warning"
                     @click="handleBlock(1,scope.row.id)">封禁</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0"
                :total="total"
                :page.sync="listQuery.page"
                :size.sync="listQuery.size"
                @pagination="getList"></pagination>
    <CreateUser :showDialog.sync="showDialog"
                @create-user="handleCreate" />
  </div>
</template>

<script>
import { getUserList, createUser, deleteUser, updateUser } from '@/api/user'
import Pagination from '@/components/Pagination'
import CreateUser from './components/CreateUser'
export default {
  name: 'UserList',
  data () {
    return {
      list: [], // 数据列表
      total: 0, // 数据总数
      listQuery: { page: 1, size: 10 }, // 分页参数
      searchForm: { keywords: '', userType: '1', isBlock: '' }, // 搜索表单
      showDialog: false // 新建窗口显示
    }
  },
  methods: {
    // 1:封禁/0:解封用户
    handleBlock (type, id) {
      const tip = type ? '封禁' : '解封'
      this.$confirm(`此操作将${tip}该用户, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateUser({ id, isBlock: type }).then(res => {
          this.$message({ type: 'success', message: `${tip}成功!!!` })
          this.getList()
        })
      }).catch(() => { })
    },
    // 新增用户
    handleCreate (params) {
      createUser(params)
        .then(res => {
          this.$message({ type: 'success', message: '新增成功!!!' })
          this.getList()
        })
    },
    // 删除用户
    handleDelete (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser({ id }).then(res => {
          this.$message({ type: 'success', message: '删除成功!!!' })
          this.getList()
        })
      }).catch(() => { })
    },
    // 获取用户列表
    getList () {
      getUserList({ ...this.listQuery, ...this.searchForm })
        .then(res => {
          this.list = res.data.list
          this.total = res.data.total
        })
    },
    // 格式化用户类型
    userTypeFormat (row, column) {
      const userType = row[column.property]
      const userTypeList = { 1: '用户', 99: '管理员', 2: '已删除' }
      return userTypeList[userType]
    },
    // 格式化是否封禁
    isBlockFormat (row, column) {
      return row[column.property] ? '是' : '否'
    }
  },
  created () {
    this.getList()
  },
  components: { Pagination, CreateUser }
}
</script>
