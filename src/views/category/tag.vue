<template>
  <div class="content-container tag-list">
    <el-row>
      <el-form :inline="true"
               :model="searchForm">
        <el-form-item label="关键词">
          <el-input v-model="searchForm.keywords"
                    placeholder="请输入关键词"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     size="medium"
                     @click="getList">查询</el-button>
          <el-button type="primary"
                     size="medium"
                     @click="showDialog=true">新增类别</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table :data="list"
              @cell-dblclick="rowDblclick"
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
      <el-table-column label="标签名"
                       align="center">
        <template slot-scope="scope">
          <span v-if="!isEdit[scope.row.id]">{{scope.row.content}}</span>
          <el-input v-if="isEdit[scope.row.id]"
                    size="small"
                    v-model="scope.row.content"
                    placeholder="请输入标签名"
                    @change="handleUpdate(scope.row)"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt"
                       label="创建日期"
                       align="center">
        <template slot-scope="scope">
          <span>{{scope.row.createdAt|dateFormat}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt"
                       label="修改日期"
                       align="center">
        <template slot-scope="scope">
          <span>{{scope.row.updatedAt|dateFormat}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       align="center">
        <template slot-scope="scope">
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
    <el-dialog title="新增标签"
               :visible.sync="showDialog"
               :close-on-click-modal="false"
               @close="closeDialog"
               width="30%">
      <el-form :model="detailForm"
               :rules="rules"
               ref="detailForm"
               label-width="80px">
        <el-form-item label="标签名"
                      prop="content">
          <el-input v-model="detailForm.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="handleCreate">新增</el-button>
          <el-button @click="closeDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getTagList, createTag, updateTag, deleteTag } from '@/api/tag'
import Pagination from '@/components/Pagination'
export default {
  name: 'ArticleTag',
  data () {
    return {
      list: [], // 标签列表
      total: 0, // 数据总数
      listQuery: { page: 1, size: 10 }, // 分页参数
      searchForm: { keywords: '' }, // 搜索表单
      showDialog: false, // 新建类别窗口显示
      detailForm: { content: '' }, // 类别详情
      rules: {
        content: [{ required: true, message: '请输入标签名', trigger: 'blur' }]
      },
      isEdit: {}
    }
  },
  methods: {
    rowDblclick (row, column, cell, event) {
      if (column.label === '标签名') {
        this.$set(this.isEdit, row.id, true)
      }
    },
    // 更新标签
    handleUpdate (row) {
      const { id, content } = row
      if (!content) return this.$message({ type: 'error', message: '请输入标签名' })
      updateTag({ id, content })
        .then(res => {
          this.isEdit[id] = false
          this.getList()
        })
    },
    // 新增标签
    handleCreate () {
      this.$refs['detailForm'].validate((valid) => {
        if (valid) {
          createTag(this.detailForm)
            .then(res => {
              this.$message({ type: 'success', message: '新增成功!!!' })
              this.closeDialog()
              this.getList()
            })
        }
      })
    },
    // 删除类别
    handleDelete (id) {
      this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTag({ id }).then(res => {
          this.$message({ type: 'success', message: '删除成功!!!' })
          this.getList()
        })
      }).catch(() => { })
    },
    // 获取标签列表
    getList () {
      getTagList({ ...this.listQuery, ...this.searchForm })
        .then(res => {
          this.list = res.data.list
          this.total = res.data.total
        })
    },
    // 关闭弹窗
    closeDialog () {
      this.showDialog = false
      this.$refs['detailForm'].resetFields()
    }
  },
  created () {
    this.getList()
  },
  components: { Pagination }
}
</script>

<style>
</style>
