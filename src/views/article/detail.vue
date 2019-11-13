<template>
  <div class="article-detail">
    <sticky>
      <el-button @click="$router.push({ path: '/article' })">返回文章列表</el-button>
      <span v-if="articleId"
            style="margin-left:20px;">文章状态: {{ articleForm.status | statusFormat }}</span>
      <template v-slot:right>
        <el-button v-loading="loading"
                   type="success"
                   @click="handlePublish(1)">发布
        </el-button>
        <el-button v-loading="loading"
                   type="warning"
                   @click="handlePublish(0)">草稿</el-button>
      </template>
    </sticky>
    <el-form class="form-container"
             :model="articleForm"
             ref="articleForm"
             :rules="rules"
             label-width="80px">
      <el-form-item label="标题"
                    prop="title">
        <el-input v-model="articleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="描述"
                    prop="description">
        <el-input type="textarea"
                  :rows="3"
                  v-model="articleForm.description"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="6">
          <el-form-item label="分类"
                        prop="categoryId">
            <el-select v-model="articleForm.categoryId"
                       filterable
                       placeholder="请选择分类">
              <el-option v-for="category in categoryList"
                         :key="category.id"
                         :label="category.content"
                         :value="category.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item prop="content">
        <div class="editor-container">
          <mavon-editor style="height: 100%"
                        v-model="articleForm.content"
                        placeholder=" "
                        :subfield="true"></mavon-editor>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { getAllCategoryList } from '@/api/category'
import { createArticle, getArticleById, updateArticle } from '@/api/article'
export default {
  name: 'ArticleDetail',
  data () {
    return {
      categoryList: [], // 类别列表
      articleId: '',
      articleForm: {
        title: '',
        description: '',
        content: '',
        categoryId: ''
      },
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ],
        categoryId: [
          { required: true, message: '请选择类别', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    handlePublish (type) {
      this.$refs['articleForm'].validate(valid => {
        if (valid) {
          const params = { ...this.articleForm }
          params.status = type ? 1 : 0
          const temp = type ? '发布' : '存入草稿'
          if (this.articleId) {
            // 编辑
            params.id = this.articleId
            updateArticle(params).then(() => {
              this.$message({ type: 'success', message: `成功${temp}!!!` })
            })
          } else {
            // 新增
            createArticle(params).then(res => {
              this.articleId = res.data.id
              this.$router.push({ path: `/article/edit/${this.articleId}` })
              this.$message({ type: 'success', message: `成功${temp}!!!` })
            })
          }
        }
      })
    }
  },
  created () {
    this.articleId = this.$route.params.id
    getAllCategoryList().then(res => {
      this.categoryList = res.data
    })
    if (this.articleId) {
      getArticleById(this.articleId).then(res => {
        const article = res.data
        this.articleForm = article
      })
    }
  },
  filters: {
    // 格式化状态信息
    statusFormat (value) {
      const statusList = { 0: '草稿', 1: '发布', 2: '已删除' }
      return statusList[value]
    }
  },
  components: {
    Sticky,
    mavonEditor
  }
}
</script>

<style scoped lang="stylus">
.form-container {
  padding: 40px 45px 20px 50px;

  .editor-container {
    height: 500px;
  }
}
</style>
