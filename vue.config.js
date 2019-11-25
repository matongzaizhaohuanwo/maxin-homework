const api = 'http://39.106.120.138:3002';

module.exports = {
  devServer: {
    publicPath: '/',
    proxy: {
      '/api': {
        target: api,
        changeOrigin: true
      },
      '/public': {
        target: api,
        changeOrigin: true
      }
    }
  },

  chainWebpack: config => {
    config.plugins.delete('fork-ts-checker');
  },

  productionSourceMap: false,
  assetsDir: 'static'
};
