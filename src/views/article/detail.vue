<template>
  <div class="article-detail">
    <sticky :class-name="'sub-navbar '+articleForm.status">
      <el-button v-loading="loading"
                 type="success"
                 @click="submitForm">发布
      </el-button>
      <el-button v-loading="loading"
                 type="warning"
                 @click="draftForm">草稿</el-button>
    </sticky>
    <el-form class="form-container"
             ref="articleForm"
             :rules="articleRules"
             label-width="50px">
      <el-form-item label="标题"
                    prop="title">
        <el-input v-model="articleForm.title"></el-input>
      </el-form-item>

      <el-form-item label="描述"
                    prop="describe">
        <el-input type="textarea"
                  :rows="3"
                  v-model="articleForm.describe"></el-input>
      </el-form-item>

      <el-row :gutter="0">
        <el-col :span="10">
          <el-form-item label="分类"
                        prop="classify">
            <el-select v-model="articleForm.classify"
                       placeholder="请选择分类">
              <el-option label="测试"
                         value="test"></el-option>
              <el-option label="生活"
                         value="shenghuo"></el-option>
              <el-option label="分类3"
                         value="fenlei3"></el-option>
              <el-option label="分类4"
                         value="fenlei4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="标签"
                        prop="classify">
            <el-select v-model="articleForm.tags"
                       multiple
                       placeholder="请选择标签(可多选)">
              <el-option label="标签1"
                         value="biaoqian1"></el-option>
              <el-option label="标签2"
                         value="biaoqian2"></el-option>
              <el-option label="标签3"
                         value="biaoqian3"></el-option>
              <el-option label="标签4"
                         value="biaoqian4"></el-option>
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
import Sticky from 'components/sticky'
// import MaterialInput from 'vue-material-input'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  describe: '', // 文章描述
  content: '', // 文章内容
  classify: '',
  tags: ''
}

export default {
  name: 'articleDetail',
  data () {
    return {
      articleForm: Object.assign({}, defaultForm),
      loading: false,
      articleRules: {

      }
    }
  },
  methods: {
    submitForm () {
      this.$api.article.articlePublish(this.articleForm)
        .then(res => {
          this.articleForm.status = 'published'
          console.log(res)
        })
    },
    draftForm () {
      console.log('draftForm')
      this.articleForm.status = 'draft'
    }
  },
  components: {
    Sticky, mavonEditor
  }
}
</script>

<style scoped lang="stylus">
.article-detail
  position relative
  .form-container
    padding 40px 45px 20px 50px
    .editor-container
      height 500px
</style>
