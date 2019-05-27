<template>
  <div class="aside-item">
    <el-submenu v-if="hasSubmenu"
                :index="router.path">
      <template slot="title">
        <SvgIcon style="margin-right:16px"
                 :icon="router.meta.icon" />
        <span slot="title">{{router.meta.title}}</span>
      </template>
      <el-menu-item v-for="item in router.children"
                    :key="item.path"
                    :index="router.path+'/'+item.path">{{item.meta.title}}</el-menu-item>
    </el-submenu>

    <el-menu-item v-else
                  :index="router.redirect?router.redirect:router.path">
      <SvgIcon style="margin-right:16px"
               :icon="router.meta.icon" />
      <span slot="title">{{router.meta.title}}</span>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: 'AsideItem',
  props: {
    route: { type: Object, required: true }
  },
  computed: {
    // 过滤后的路由
    router () {
      return this.filterRouter(this.route)
    },
    // 根据过滤后的路由判断是否有submenu
    hasSubmenu () {
      if (this.router.children.length > 1) return true
      return false
    }
  },
  methods: {
    // 过滤hidden:true的路由
    filterRouter (router) {
      if (router.hidden) return
      if (router.children) {
        router.children = router.children.filter(item => {
          if (!item.hidden) return item
        })
      }
      return router
    }
  }
}
</script>
