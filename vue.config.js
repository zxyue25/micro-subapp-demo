const {
    AutoCreateVueRouteWebpackPlugin,
  } = require('vue-auto-create-route/build/plugin') //自动化路由
const appName = process.env.VUE_APP_NAME
const publicPath = `/${appName}/`

module.exports = {
  publicPath,
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    // host: 'subapp1.fe.com',
    port: '8083',
    proxy: {
      [`${publicPath}_baseAPI`]: {
        target: 'http://subapp1.be.com',
        changeOrigin: true,
        pathRewrite: {
          [`^${publicPath}_baseAPI`]: '',
        },
      },
    },
  },
  configureWebpack: {
    output: {
      library: appName,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${appName}`,
    },
    plugins: [
        new AutoCreateVueRouteWebpackPlugin(
          { cwd: __dirname},
          null,
          true
        ),
      ],
  },
}
