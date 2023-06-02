const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  chainWebpack: config => {
    config.module
      .rule('worker-loader')
      .test(/\.worker\.js$/)
      .use({
        loader: 'worker-loader',
        options: {
          inline: true,
          workerType: 'module'
        }
      })
      .loader('worker-loader')
      .end()
  },
  transpileDependencies: true,
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    disableHostCheck: true,
  },
  devServer: {
    
    //这里的ip和端口是前端项目的;下面为需要跨域访问后端项目
    proxy: {
      '/api': {
        target: 'http://localhost:5001',//这里填入你要请求的接口的前缀
        ws:true,//代理websocked
        changeOrigin:true,//虚拟的站点需要更管origin
        pathRewrite:{
          '^/api':""//重写路径
        },
      }
    }
  },
})
