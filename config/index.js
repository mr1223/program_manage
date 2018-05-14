// see http://vuejs-templates.github.io/webpack for documentation.
/**
 * 这个页面只需要改三个地方，
 * 一：22行的port，调试环境的webserver端口
 * 二：18行，true则生成sourcemap，false不生成
 */
var path = require('path')

module.exports = {
  root:{
  	env: 'root',
  	assetsRoot: path.resolve(__dirname, '../dist'),
  	assetsPublicPath: '/',//    /wechat
  },
  build: {
    env: 'production',
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    assetsSubDirectoryOfDev: 'static',
    assetsPublicPathOfDev: '/',
    productionSourceMap: true,
    publishPath: 'E:/Program/Apache/Apache2.2/htdocs' // 发布到web容器，容器的地址
  },
  dev: {
    env: 'development',
    port: 8081,
    assetsPublicPath: '/',
    assetsSubDirectory: 'static',
    'proxyTable': {
    	//代理配置
      	'/Admin': {
        	target: 'http://localhost/Admin',
        	changeOrigin: true,
        	pathRewrite: {
          		'^/Admin': ''
        	}
      	},
    },
    cssSourceMap: false
  },
  link: {
  	
  }
}
