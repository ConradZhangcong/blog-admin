<template>
  <div class="content-container comment-list">
    <el-row>
      <el-form :inline="true"
               :model="searchForm">
        <el-form-item label="关键词">
          <el-input v-model="searchForm.keywords"
                    placeholder="请输入关键词"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status"
                     placeholder="请选择评论审核状态"
                     clearable>
            <el-option label="不通过"
                       value="0"></el-option>
            <el-option label="待审核"
                       value="1"></el-option>
            <el-option label="通过"
                       value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     size="medium"
                     @click="getList">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table :data="list"
              border>
      <el-table-column label="文章">
        <template slot-scope="scope">
          <el-popover trigger="hover"
                      placement="top-start">
            <p>id: {{ scope.row.article && scope.row.article.id }}</p>
            <p>标题: {{ scope.row.article && scope.row.article.title }}</p>
            <p>
              描述: {{ scope.row.article && scope.row.article.description }}
            </p>
            <p>阅读量: {{ scope.row.article && scope.row.article.reading }}</p>
            <p>评论数: {{ scope.row.article && scope.row.article.comment }}</p>
            <div slot="reference">
              <el-tag size="medium">{{ scope.row.article && scope.row.article.title }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="用户">
        <template slot-scope="scope">
          <el-popover trigger="hover"
                      placement="top-start">
            <p>id: {{ scope.row.user && scope.row.user.id }}</p>
            <p>用户名: {{ scope.row.user && scope.row.user.username }}</p>
            <p>
              用户类型:
              {{ scope.row.user && scope.row.user.userType | userTypeFormat }}
            </p>
            <div slot="reference">
              <el-tag size="medium">{{ scope.row.user && scope.row.user.username }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="content"
                       label="评论">
        <template slot-scope="scope">
          <el-popover trigger="hover"
                      placement="top-start">
            <p>{{ scope.row.content }}</p>
            <div slot="reference">
              <el-tag size="medium">{{ scope.row.content }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column width="80"
                       label="状态"
                       align="center">
        <template slot-scope="scope">
          <el-popover v-if="scope.row.status === 2"
                      trigger="hover"
                      placement="top-start">
            <p>{{ scope.row.reason }}</p>
            <div slot="reference">
              <el-tag size="medium">{{
                scope.row.status | statusFormat
              }}</el-tag>
            </div>
          </el-popover>
          <span v-else>{{ scope.row.status | statusFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt"
                       align="center"
                       width="170"
                       label="发表日期">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt | datetimeFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt"
                       align="center"
                       width="170"
                       label="修改日期">
        <template slot-scope="scope">
          <span>{{ scope.row.updatedAt | datetimeFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       width="300"
                       label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 0"
                     size="mini"
                     type="success"
                     @click="handleChange(scope.row.id, 1)">
            通过
          </el-button>
          <el-button v-if="scope.row.status === 0"
                     size="mini"
                     type="warning"
                     @click="handleChange(scope.row.id, 2)">
            不通过
          </el-button>
          <el-button size="mini"
                     type="danger"
                     @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0"
                :total="total"
                :page.sync="listQuery.page"
                :size.sync="listQuery.size"
                @pagination="getList"></pagination>
  </div>
</template>

<script>
import { getCommentList, updateComment, deleteComment } from '@/api/comment'
import Pagination from '@/components/Pagination'
export default {
  name: 'CommentList',
  data () {
    return {
      list: [],
      total: 0,
      listQuery: { page: 1, size: 10 },
      searchForm: { keywords: '', status: '' }
    }
  },
  methods: {
    // 删除评论
    handleDelete (id) {
      this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteComment({ id }).then(() => {
          this.$message({ type: 'success', message: '删除成功!!!' })
          this.getList()
        })
      })
    },
    // 审核评论
    async handleChange (id, status) {
      let reason = null
      if (status === 2) {
        reason = await this.$prompt('请输入审核不通过理由', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /\S/,
          inputErrorMessage: '请输入审核不通过理由'
        })
          .then(({ value }) => {
            return value
          })
          .catch(() => {
            return null
          })
      }
      if (reason !== null || status === 1) {
        updateComment({ id, status, reason }).then(() => {
          this.getList()
          this.$message({ type: 'success', message: '审核成功' })
        })
      }
    },
    // 获取文章列表
    getList () {
      getCommentList({ ...this.listQuery, ...this.searchForm }).then(res => {
        this.list = res.data
        this.total = res.total
      })
    }
  },
  created () {
    this.getList()
  },
  components: { Pagination },
  filters: {
    // 格式化用户类型
    userTypeFormat (value) {
      const userTypeList = { 1: '用户', 99: '管理员' }
      return userTypeList[value]
    },
    // 格式化状态信息
    statusFormat (value) {
      const statusList = { 0: '待审核', 1: '通过', 2: '不通过' }
      return statusList[value]
    }
  }
}
</script>
