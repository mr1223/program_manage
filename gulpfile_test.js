'use strict';
const gulp = require('gulp');
const webpack = require('webpack');


//gulp 传递参数
const minimist = require('minimist');
const gutil = require('gulp-util');
var src = process.cwd() + '/dist/static';
var assets = process.cwd() + '/dist';
 
 

var knownOptions = {
 string: 'env',
 default: {env: process.env.NODE_ENV || 'production'}
};
 
 console.log(process.argv.slice(2));
var options = minimist(process.argv.slice(2), knownOptions);
 
var webpackProd = require('./build/webpack.prod.conf');
var webpackDev = require('./build/webpack.dev.conf');
 
var remoteServer = {
 host: '60.205.200.201',
 remotePath: '/var/www/program',
 user: 'root',
 pass: 'bj-humai123.'
};
var localServer = {
 host: '60.205.200.201',
 remotePath: '/var/www/program',
 user: 'root',
 pass: 'bj-humai123.'
}
 
//check code
gulp.task('hint', function () {
 var jshint = require('gulp-jshint')
 var stylish = require('jshint-stylish')
 
 return gulp.src([
  '!' + src + '/js/*.js',
  src + '/js/**/*.js'
 ])
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
})
 
// clean asserts
gulp.task('clean', ['hint'], function () {
 var clean = require('gulp-clean');
 return gulp.src(assets, {read: true}).pipe(clean())
});
 
//run webpack pack
gulp.task('pack', ['clean'], function (done) {
 var _conf = options.env === 'production' ? webpackProd : webpackDev;
 webpack(_conf, function (err, stats) {
  if (err) throw new gutil.PluginError('webpack', err)
  gutil.log('[webpack]', stats.toString({colors: true}))
  done()
 });
});
 
//default task
gulp.task('default', ['pack'])
 
//deploy assets to remote server
gulp.task('deploy', function () {
 var sftp = require('gulp-sftp');
 var _conf = options.env === 'production' ? remoteServer : localServer;
 return gulp.src(assets + '/**')
  .pipe(sftp(_conf))
})










