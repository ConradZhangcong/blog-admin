const path = require('path')

module.exports = {
  devServer: {
    port: 9707,
    https: false,
    open: false
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
