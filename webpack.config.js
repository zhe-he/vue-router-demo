const webpack = require("webpack");
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');
const path = require('path');

const autoprefixer = require('autoprefixer');
// const pluginsText = new Date().toUTCString() + '\n\r * built by `zhe-he`';


const DIST = 'www/dist/';

var loaders = [
	{loader:'style-loader'},
	{loader: 'css-loader'},
	{
		loader: 'postcss-loader',
		options: {
			plugins: [
				autoprefixer({ browsers: ['last 7 versions'], cascade: false })
			]
		}
	}
];
module.exports = {
	// 页面入口文件配置
	entry: {
		"main": ['whatwg-fetch','babel-polyfill','js/main.js'],
	},
	// 入口文件输出配置
	output: {
		publicPath: 'dist/',
		path: path.resolve(__dirname, DIST),
		filename: '[name].js',
		chunkFilename: 'js/chunk-[id].js?[hash]',
	},
	// 插件项
	plugins: [
		/* new CommonsChunkPlugin({
			name: "common",
			minChunks: 3
		}),*/
	    /*new webpack.optimize.UglifyJsPlugin({
	      compressor: {
	        warnings: false,
	        mangle: false
	      }
	    }),*/
	],
	module: {
		rules: [
			{test: /\.html$/,exclude:/node_modules/,use: ['pug-loader']},
			{
				test: /\.js$/,
				exclude:/(node_modules|lib)/,
				use: [
					{
						loader:'babel-loader',
						options: {presets: [["es2015", { "modules": false }]]}
					}
				]
			},
			{test: /\.tsx?$/,exclude:/(node_modules)/,use:['ts-loader']},
			{
				test: /\.css|components$/,
				exclude:/node_modules/,
				use: loaders
			},
			{
				test: /\.(scss|sass)$/,
				exclude:/node_modules/,
				use: loaders.concat({loader:'sass-loader'})
			},
			{
				test: /\.less$/,
				exclude:/node_modules/,
				use: loaders.concat({loader:'less-loader'})
			},
			{
				test: /\.vue$/,
				exclude:/node_modules/,
				use: [
					{
						loader: 'vue-loader',
						options: {
							preserveWhitespace: false,
							postcss: [autoprefixer({browsers: ['last 7 versions']})],
							loaders: {
								'js': 'babel-loader?presets[]=es2015'
							}
						}
					}
				]
			},
			{test: /\.(json|data)$/,exclude:/node_modules/,use: ['json-loader']},
			{test: /\.(txt|md)$/,exclude:/node_modules/,use: ['raw-loader']},
			{test: /\.svg$/,use: ['raw-loader']},
			{
				test: /\.(png|jpe?g|gif)$/,
				exclude:/node_modules/,
				use: [
					{
						loader:'url-loader',
						options: {
							limit: 8192,
							name: '[path][name].[ext]?[hash]'
						}
					}
				]
			},
			{
				test: /\.(ttf|woff2?|svg|eot)$/,
				exclude:/node_modules/,
				use: [
					{
						loader:'url-loader',
						options: {
							limit: 1,
							name: '[path][name].[ext]?[hash]'
						}
					}
				]
			},
		]
	},
	// 其他配置
	resolve: {
		modules: [
			process.cwd(),
			"node_modules"
		],
		extensions: ['.ts','.js','.vue'],
		alias: {
			"vue": 				"js/libs/vue.common.js",
		}
	}
};