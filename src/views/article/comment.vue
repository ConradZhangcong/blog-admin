<template>
  <div class="content-container comment-list">
    <el-table :data="commentList"
              border>
      <el-table-column type="index"
                       width="50"
                       align="center">
      </el-table-column>
      <el-table-column prop="createTime"
                       label="发表时间"
                       width="300"
                       align="center"
                       :formatter="dateFormat">
      </el-table-column>
      <el-table-column label="文章">
        <template slot-scope="scope">
          <el-popover trigger="hover"
                      placement="top-start">
            <p>描述: {{scope.row.articleId.describe}}</p>
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium">{{scope.row.articleId.title}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="评论信息">
        <template slot-scope="scope">
          <el-popover trigger="hover"
                      placement="top-start">
            <p>评论用户: {{scope.row.fromUId.username}}</p>
            <p>回复用户: {{scope.row.toUId}}</p>
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium">{{scope.row.content}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="state"
                       label="状态"
                       width="150"
                       align="center"
                       :formatter="statusFormat">
      </el-table-column>
      <el-table-column label="审核"
                       width="300"
                       align="center">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="success"
                     @click="handleVerify(scope.$index, scope.row, 1)">通过</el-button>
          <el-button size="mini"
                     type="info"
                     @click="handleVerify(scope.$index, scope.row, 0)">不通过</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0"
                :total="total"
                :page.sync="listQuery.page"
                :limit.sync="listQuery.pageSize"
                @pagination="_getList"></pagination>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'comment-list',
  data () {
    return {
      commentList: [], // 评论列表数据
      total: 0, // 评论总数
      listQuery: {
        page: 1, // 当前页数
        pageSize: 10, // 每页评论数
        state: '' // 评论审核的状态
      }
    }
  },
  methods: {
    // 格式化状态信息
    statusFormat (row, column) {
      const status = row[column.property]
      const statusList = { 0: '待审核', 1: '通过', 2: '不通过' }
      return statusList[status]
    },
    handleVerify (index, row, state) {
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    // 获取文章列表
    _getList () {
    }
  },
  created () {
    this._getList()
  },
  components: {
    Pagination
  }
}
</script>
