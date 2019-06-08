<template>
  <div class="layout">
    <common-header></common-header>
    <common-aside></common-aside>
    <div class="container"
         :style="{ left : asideWidth }">
      <transition name="fade"
                  mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
// import { $AsideWidth, $CollapseAsideWidth } from '@/assets/variables.styl'
import commonHeader from './components/Header'
import commonAside from './components/Aside'
import { mapGetters } from 'vuex'
export default {
  name: 'Layout',
  components: {
    commonHeader,
    commonAside
  },
  computed: {
    ...mapGetters(['isCollapse']),
    asideWidth () {
      return this.isCollapse ? '65px' : '240px'
    }
  },
  created () {
    // console.log($AsideWidth)
    // console.log($CollapseAsideWidth)
  }
}
</script>

<style scoped lang="stylus">
.layout
  width 100%
  min-height 100%
  .container
    position absolute
    right 0
    top $HeaderHeight
    bottom 0
    overflow hidden
    overflow-y auto
    transition left 0.4s
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
</style>
