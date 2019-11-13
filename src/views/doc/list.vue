<template>
  <div class="content-container doc-list">
    <div class="menu">
      <el-tree :data="menu"
               node-key="id"
               :expand-on-click-node="false"
               :default-expanded-keys="expandedKey"
               @node-click="handleMove"
               ref="menu">
      </el-tree>
    </div>
    <transition>
      <div class="markdown-body"
           ref="content"></div>
    </transition>
  </div>
</template>

<script>
import { getDocList } from '@/api/index'
import marked from 'marked'
import '@/assets/css/markdown.css'
export default {
  name: 'DocList',
  data () {
    return {
      docs: '',
      menu: [], // id label offsetTop children
      expandedKey: [] // 默认展开的数组
    }
  },
  async created () {
    const res = await getDocList()
    this.docs = marked(res.data)
    this.$refs.content.innerHTML = this.docs
    const h2List = this.$refs.content.getElementsByTagName('h2')
    const h3List = this.$refs.content.getElementsByTagName('h3')
    const h4List = this.$refs.content.getElementsByTagName('h4')
    for (let h2 of h2List) {
      const { id, innerHTML, offsetTop } = h2
      this.menu.push({ id, label: innerHTML, offsetTop, children: [] })
      this.expandedKey.push(id)
    }
    for (let h3 of h3List) {
      const { id, innerHTML, offsetTop } = h3
      let flag = 0
      for (let i of this.menu) {
        if (i.offsetTop < offsetTop) flag++
      }
      this.menu[flag - 1].children.push({
        id,
        label: innerHTML,
        offsetTop,
        children: []
      })
    }
    for (let h4 of h4List) {
      const { id, innerHTML, offsetTop } = h4
      let flag = 0
      for (let i of this.menu[4].children) {
        if (i.offsetTop < offsetTop) flag++
      }
      this.menu[4].children[flag - 1].children.push({
        id,
        label: innerHTML,
        offsetTop,
        children: []
      })
    }
  },
  methods: {
    appendChild () { },
    handleMove (node) {
      // const end = node.offsetTop
      // const start = document.documentElement.scrollTop || document.body.scrollTop
      // const oContent = this.$refs.container
      this.$router.replace({ path: `/doc/list` })
      this.$router.push({ path: `/doc/list#${node.id}` })
    },
    moveto () {
      // let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
      // let speed = Math.floor((menuList[i].offsetTop - currentScroll) / 3)
      // if (speed !== 0) {
      //   requestAnimationFrame(moveto)
      //   scrollTo(0, currentScroll + speed)
      // } else {
      //   scrollTo(0, menuList[i].offsetTop)
      // }
    }
  }
}
</script>

<style scoped lang="stylus">
.doc-list {
  border-right: 1px solid rgba(0, 0, 0, 0.07);

  .menu {
    position: fixed;
    height: 90%;
    overflow-y: scroll;
  }

  .markdown-body {
    margin-left: 250px;
  }
}
</style>
