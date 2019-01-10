<template>
  <div class="article-list" style="padding: 20px;">
    <el-table :data="articleList"
              border
              style="width: 100%;text-align:center;">
      <el-table-column type="index"
                       width="50"
                       align="center">
      </el-table-column>
      <el-table-column prop="createTime"
                       :formatter="dateFormat"
                       label="发表日期"
                       align="center">
      </el-table-column>
      <el-table-column prop="modifyTime"
                       :formatter="dateFormat"
                       label="修改日期"
                       align="center">
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          <el-popover trigger="hover"
                      placement="top-start">
            <p>标题: {{scope.row.title}}</p>
            <p>描述: {{scope.row.describe}}</p>
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium">{{scope.row.title}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="分类">
        <template slot-scope="scope">
          <el-popover trigger="hover"
                      placement="top-start">
            <p>标签: </p>
            <p v-for="(item,index) in scope.row.tags"
               :key="index">&nbsp;&nbsp;{{item}}</p>
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium">{{scope.row.classify}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="reading"
                       label="阅读量"
                       align="center">
      </el-table-column>
      <el-table-column prop="comments"
                       label="评论"
                       align="center">
      </el-table-column>
      <el-table-column prop="favourite"
                       label="收藏"
                       align="center">
      </el-table-column>
      <el-table-column label="操作"
                       width="200"
                       align="center">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="primary"
                     @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0"
                :total="total"
                :page.sync="listQuery.page"
                :limit.sync="listQuery.limit"
                @pagination="_getList"></pagination>
  </div>
</template>

<script>
import Pagination from 'components/pagination'
export default {
  name: 'article-list',
  data () {
    return {
      articleList: [], // 文章列表数据
      total: 7, // 文章总数
      listQuery: {
        page: 1, // 当前页数
        limit: 10 // 每页文章数
      }
    }
  },
  methods: {
    // 格式化时间
    dateFormat (row, column) {
      let date = row[column.property]
      if (date === 'undefined') {
        return ''
      }
      return this.moment(date).format('YYYY-MM-DD')
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    // 获取文章列表
    _getList () {
      this.$api.article.articleList(this.listQuery)
        .then(res => {
          this.articleList = res.data.data
        })
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
