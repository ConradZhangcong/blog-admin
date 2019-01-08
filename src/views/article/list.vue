<template>
  <div class="article-list">
    <el-table :data="articleList"
              style="width: 100%">
      <el-table-column prop="date"
                       label="日期"
                       width="180">
      </el-table-column>
      <el-table-column prop="name"
                       label="姓名"
                       width="180">
      </el-table-column>
      <el-table-column prop="address"
                       label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'article-list',
  data () {
    return {
      articleList: [
      ] // 文章列表数据
    }
  },
  created () {
    this.$api.article.articleList().then(res => console.log(res))
  }
}
</script>

<style>
</style>
