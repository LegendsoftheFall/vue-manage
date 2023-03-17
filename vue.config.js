module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'manage'
        return args
      })
  }
  // assetsDir: 'static',
  // devServer: {
  //   open: true,
  //   host: '0.0.0.0',
  //   port: '8080',
  //   https: false,
  //   hotOnly: true,
  //   proxy: {
  //     '/explore': {
  //       target: 'http://localhost:8081',
  //       ws: true,
  //       changeOrigin: true
  //       // pathRewrite: { '^/explore': '/explore' }
  //     }
  //   }
  // }
}
