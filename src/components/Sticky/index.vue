<template>
  <div class="sticky"
       :style="{height:height+'px',zIndex:zIndex}">
    <div class="sub-navbar"
         :style="{top:stickyTop+'px',zIndex:zIndex,position:position,width:width,height:height+'px'}">
      <slot></slot>
      <div style="float:right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sticky',
  props: {
    stickyTop: { type: Number, default: 0 },
    zIndex: { type: Number, default: 1 }
  },
  data () {
    return {
      active: false,
      position: '',
      width: undefined,
      height: undefined,
      isSticky: false
    }
  },
  mounted () {
    this.height = this.$el.getBoundingClientRect().height
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleReize)
  },
  activated () {
    this.handleScroll()
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleReize)
  },
  methods: {
    sticky () {
      if (this.active) {
        return
      }
      this.position = 'fixed'
      this.active = true
      this.width = this.width + 'px'
      this.isSticky = true
    },
    reset () {
      if (!this.active) {
        return
      }
      this.position = ''
      this.width = 'auto'
      this.active = false
      this.isSticky = false
    },
    handleScroll () {
      this.width = this.$el.getBoundingClientRect().width
      const offsetTop = this.$el.getBoundingClientRect().top
      if (offsetTop < this.stickyTop) {
        this.sticky()
        return
      }
      this.reset()
    },
    handleReize () {
      if (this.isSticky) {
        this.width = this.$el.getBoundingClientRect().width + 'px'
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.sub-navbar
  height 50px
  line-height 50px
  padding 0 20px
  transition 600ms ease position
  background #d0d0d0
  // background linear-gradient(90deg, rgba(32, 182, 249, 1) 0%, rgba(32, 182, 249, 1) 0%, rgba(33, 120, 241, 1) 100%, rgba(33, 120, 241, 1) 100%)
  // &.draft
  // background #d0d0d0
  // &.deleted
  // background #d0d0d0
</style>
