<template>
  <div class="content-container article-list">
    <el-row>
      <el-form :inline="true"
               :model="searchForm">
        <el-form-item label="关键词">
          <el-input v-model="searchForm.keywords"
                    placeholder="请输入关键词"></el-input>
        </el-form-item>
        <el-form-item label="类别">
          <el-select v-model="searchForm.categoryId"
                     placeholder="请选择文章类别"
                     clearable>
            <el-option v-for="category in categoryList"
                       :key="category.id"
                       :label="category.content"
                       :value="category.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status"
                     placeholder="请选择文章状态"
                     clearable>
            <el-option label="草稿"
                       value="0"></el-option>
            <el-option label="已发布"
                       value="1"></el-option>
            <el-option label="已删除"
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
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" label-width="80px" class="table-expand">
            <el-form-item label="文章标题">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="文章描述">
              <span>{{ props.row.description }}</span>
            </el-form-item>
            <el-form-item label="类别"
                          v-if="props.row.category">
              <span>{{ props.row.category.content }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="标题"
                       prop="title"></el-table-column>
      <el-table-column label="类别"
                       prop="category.content">
        <template slot-scope="scope">
          {{ scope.row.content ? scope.row.category.content : '' }}
        </template>
      </el-table-column>
      <el-table-column prop="reading"
                       width="80"
                       label="阅读量"
                       align="center"></el-table-column>
      <el-table-column prop="comment"
                       width="80"
                       label="评论"
                       align="center"></el-table-column>
      <el-table-column prop="status"
                       width="80"
                       label="状态"
                       :formatter="statusFormat"
                       align="center">
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
                       width="240"
                       label="操作"
                       fixed="right">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="primary"
                     @click="$router.push({ path: `/article/edit/${scope.row.id}` })">编辑</el-button>
          <el-button v-if="scope.row.status !== 0"
                     size="mini"
                     type="warning"
                     @click="handleChange(scope.row.id, 0)">存入草稿</el-button>
          <el-button v-if="scope.row.status !== 1"
                     size="mini"
                     type="success"
                     @click="handleChange(scope.row.id, 1)">发布</el-button>
          <el-button v-if="scope.row.status !== 2"
                     size="mini"
                     type="danger"
                     @click="handleChange(scope.row.id, 2)">删除</el-button>
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
import { getArticleList, updateArticle } from '@/api/article'
import { getAllCategoryList } from '@/api/category'
import Pagination from '@/components/Pagination'
export default {
  name: 'ArticleList',
  data () {
    return {
      list: [],
      categoryList: [],
      total: 0,
      listQuery: { page: 1, size: 10 },
      searchForm: { keywords: '', categoryId: '', status: '' }
    }
  },
  methods: {
    // 草稿/发布/删除 文章
    handleChange (id, status) {
      if (status == 2) {
        return this.$confirm('此操作将删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateArticle({ id, status }).then(() => {
            this.getList()
            this.$message({ type: 'success', message: '删除成功' })
          })
        })
      }
      const message = status ? '发布成功' : '存入草稿成功'
      updateArticle({ id, status }).then(() => {
        this.getList()
        this.$message({ type: 'success', message })
      })
    },
    // 格式化文章状态
    statusFormat (row, column) {
      const status = row[column.property]
      const statusList = { 0: '草稿', 1: '发布', 2: '已删除' }
      return statusList[status]
    },
    // 获取文章列表
    getList () {
      getArticleList({ ...this.listQuery, ...this.searchForm }).then(res => {
        this.list = res.data
        this.total = res.total
      })
    }
  },
  created () {
    this.getList()
    getAllCategoryList().then(res => {
      this.categoryList = res.data
    })
  },
  components: { Pagination }
}
</script>

<style scoped>
.table-expand label {
  color: #99a9bf;
}
.table-expand .el-form-item {
  margin-bottom: 0;
}
</style>
