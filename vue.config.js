const path = require('path')

module.exports = {
  devServer: {
    port: 9707,
    https: false,
    open: false,
    proxy: {
      '/v1': {
        // target: 'http://101.132.35.13:9705', // 目标接口域名
        target: 'http://localhost:9705', // 目标接口域名
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/v1': '/api/v1' // 重写接口
        }
      }
    }
  },
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
  },
  transpileDependencies: ['vue-echarts', 'resize-detector']
}
function addStyleResource (rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './src/assets/css/variables.styl')]
    })
}
