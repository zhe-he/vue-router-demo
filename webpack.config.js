const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
// const pluginsText = new Date().toUTCString() + '\n\r * built by `zhe-he`';


const DIST = 'www';


var loaders = [
    {loader:'style-loader'},
    {loader: 'css-loader'},
    {
        loader: 'postcss-loader',
        options: {
            plugins: [
                autoprefixer({ browsers: ['last 9 versions'], cascade: false })
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
        // publicPath: '',
        path: path.resolve(__dirname, DIST),
        filename: 'js/[name].js',
        chunkFilename: 'js/chunk/_[id].js?[hash]',
    },
    // 插件项
    plugins: [
        /*new webpack.optimize.UglifyJsPlugin({
          compressor: {
            warnings: false,
            mangle: false
          }
        }),*/
        new CopyWebpackPlugin([
            {from: 'images/tmp/**/*'}
        ]),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            favicon: 'images/favicon.ico',
            minify: {
                minimize: true,
                removeComments: true,
                collapseWhitespace: true
            },
            inject: "body",
            hash: true,
            chunks: ["main"]
        }),
    ],
    module: {
        rules: [
            {test: /\.html$/,exclude:/node_modules/,use: ['html-loader']},
            {
                test: /\.js$/,
                exclude:/(node_modules|lib)/,
                use: [
                    {
                        loader:'babel-loader',
                        options: {
                            presets: [
                                ["es2015", { "modules": false }]
                            ],
                            plugins: ["transform-object-rest-spread"]
                        }
                    }
                ]
            },
            {test: /\.tsx?$/,exclude:/(node_modules)/,use:['ts-loader']},
            {
                test: /\.css$/,
                exclude:/node_modules|libs/,
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
                            postcss: [autoprefixer({browsers: ['last 9 versions']})],
                            loaders: {
                                // 'ts': 'vue-ts-loader',
                                'js': 'babel-loader?presets[]=es2015&plugins[]=transform-object-rest-spread'
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
                exclude:/node_modules|tmp/,
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
                test: /\.(png|jpe?g|gif)$/,
                include:/tmp/,
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
            "vue":              "js/libs/vue.common.js",
            "inter":            "js/data/inter.js",
            "method":           "js/modules/method.js",
            "msg":              "js/modules/msg.vue",
            "WFApp":            "js/modules/WFApp.js",
            "loading":          "js/modules/loading"
        }
    }
};