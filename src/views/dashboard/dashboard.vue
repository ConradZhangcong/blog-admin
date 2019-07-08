<template>
  <div class="dashboard">
    <el-row :gutter="20"
            style="margin-bottom:20px;">
      <el-col :span="8"
              v-for="(item,index) in list"
              :key="index">
        <el-card class="statistic-crad"
                 @mouseover.native="handleMouseenter(index)"
                 @mouseout.native="handleMouseleave(index)">
          <SvgIcon :style="item.activeObject"
                   class="card-left"
                   :icon="'dash-'+item.icon" />
          <div class="card-right pull-right">
            <p class="title">{{item.title}}</p>
            <p class="number">1200</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:20px;">
      <LineChart ref="lineChart"
                 :chartData="newVisitis" />
    </el-row>
  </div>
</template>

<script>
import LineChart from './components/LineChart'
export default {
  name: 'Dashboard',
  data () {
    return {
      colorList: ['#40c9c6', '#36a3f7', '#f4516c'],
      list: [
        { icon: 'user', title: '新增用户', color: '#40c9c6' },
        { icon: 'reading', title: '新增阅读量', color: '#36a3f7' },
        { icon: 'comment', title: '新增评论', color: '#f4516c' }
      ],
      newVisitis: {
        expectedData: [100, 120, 161, 134, 105, 160, 165],
        actualData: [120, 82, 91, 154, 162, 140, 145]
      }
    }
  },
  methods: {
    handleMouseenter (index) {
      this.list[index].activeObject = { color: '#fff', background: this.colorList[index] }
    },
    handleMouseleave (index) {
      // console.log(index)
      // this.list[index].activeObject = { color: '', background: '' }
    }
  },
  mounted () {
    this.$refs.lineChart.init()
    setTimeout(() => {
      this.$refs.lineChart.setOption(this.newVisitis)
    }, 1000)
  },
  components: { LineChart }
}
</script>

<style scoped lang="stylus">
.dashboard
  height 100%
  padding 32px
  background-color #f0f2f5
  box-sizing border-box
  .statistic-crad
    width 100%
    transition all 0.5s
    .card-left
      padding 10px
      font-size 48px
      transition all 0.3s
      color #40c9c6
      border-radius 5px
    .card-right
      font-size 16px
      .number
        font-size 20px
        color #666
    &:hover
      .card-left
        background #40c9c6
        color #fff
</style>
