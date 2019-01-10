<template>
  <article-detail :is-edit="true"></article-detail>
</template>

<script>
import ArticleDetail from './detail'
export default {
  name: 'article-edit',
  components: { ArticleDetail }
}
</script>
