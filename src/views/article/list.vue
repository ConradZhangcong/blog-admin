<template>
  <div class="article-list">
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
              border
              style="width: 100%;text-align:center;">
      <el-table-column type="index"
                       width="50"
                       align="center">
      </el-table-column>
      <el-table-column prop="createdAt"
                       :formatter="dateFormat"
                       label="发表日期"
                       align="center">
      </el-table-column>
      <el-table-column prop="updatedAt"
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
                :size.sync="listQuery.size"
                @pagination="getList"></pagination>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article'
import Pagination from '@/components/Pagination'
export default {
  name: 'ArticleList',
  data () {
    return {
      list: [], // 文章列表数据
      total: 0, // 文章总数
      listQuery: { page: 1, size: 10 },
      searchForm: { keywords: '' } // 搜索表单
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    // 获取文章列表
    getList () {
      getArticleList({ ...this.listQuery, ...this.searchForm })
        .then(res => {
          this.list = res.data.list
          this.total = res.data.total
        })
    }
  },
  created () {
    this.getList()
  },
  components: {
    Pagination
  }
}
</script>
