'use strict';

const gulp = require('gulp');
const webpack = require('webpack');
const path = require('path');
const ftp = require('gulp-sftp');
const del = require('del');

const webpackProd = require('./build/webpack.prod.conf.js');
const evn = process.env.NODE_ENV == 'production' ? 'production': '';

var remoteServer = {
 host: '60.205.200.201',
 remotePath: '/var/www/program/',
 user: 'root',
 pass: 'bj-humai123.'
};

//清除生产目录文件
gulp.task('clean',['upload'],function(cb){
	console.log('清除原来编译代码');
	del(remoteServer[remotePath],cb);
})
//编译代码
gulp.task('build',function(cb){
	webpack(webpackProd,function(err, state){
		cb(err);
	})
})
//上传
gulp.task('upload',function(cb){
	console.log('正在上传');
	gulp.src('/dist/static/**')
	.pipe(ftp(webpackProd))
})

gulp.task('deploy', ['build', 'upload', 'clean'])




