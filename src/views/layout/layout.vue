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
import commonHeader from './components/Header'
import commonAside from './components/Aside'
export default {
  name: 'Layout',
  components: {
    commonHeader,
    commonAside
  }
}
</script>

<style scoped lang="stylus">
.layout
  width 100%
  min-height 100%
  .container
    position absolute
    left $AsideWidth
    right 0
    top $HeaderHeight
    bottom 0
    overflow hidden
    overflow-y auto
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
