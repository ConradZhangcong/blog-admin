<template>
  <div class="layout">
    <common-header></common-header>
    <common-aside></common-aside>
    <div class="container">
      <transition name="fade"
                  mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import commonHeader from 'components/commonHeader'
import commonAside from 'components/commonAside'
export default {
  name: 'layout',
  data () {
    return {
    }
  },
  methods: {},
  created () {
  },
  components: {
    commonHeader,
    commonAside
  },
  beforeRouteUpdate (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    // console.log('beforeRouteUpdate')
    next((vm) => {

    })
  }
}
</script>

<style scoped lang="stylus">
.fade-enter
  opacity 0
  transform translateX(-30px)
.fade-leave-to
  opacity 0
  transform translateX(30px)
.fade-enter-to, .fade-leave
  opacity 1
.fade-enter-active, .fade-leave-active
  transition 0.5s
.layout
  width 100%
  min-height 100%
  .container
    position absolute
    left 240px
    right 0
    top 70px
    bottom 0
    overflow hidden
</style>
