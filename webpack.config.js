const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const pluginsText = new Date().toLocaleString() + '\n\r * built by `zhe-he`';


const DIST = 'www';


var loaders = [
    {loader:'style-loader'},
    {loader: 'css-loader'},
    {
        loader: 'postcss-loader',
        options: {
            config: {
                path: 'config/postcss.config.js'
            }
        }
    }
];
module.exports = {
    // 页面入口文件配置
    entry: {
        "vendor": ['whatwg-fetch','babel-polyfill'],
        "main": 'js/main.js'
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
            chunks: ["vendor","main"],
            chunksSortMode: function (a, b) {
                var orders = ["vendor","main"];
                return orders.indexOf(a.names[0])-orders.indexOf(b.names[0]);
            }
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
            {
                test: /\.tsx?$/,
                exclude:/(node_modules)/,
                use:[{ loader: 'ts-loader',options: { configFileName: "config/tsconfig.json" } }]
            },
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

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        mangle: false
    }),
    new webpack.BannerPlugin(pluginsText)
    /*new webpack.LoaderOptionsPlugin({
        minimize: true
    })*/
  ])
} else {
    module.exports.module.rules.unshift({
        test: /\.(js|vue)$/,
        exclude: /libs/,
        loader: "eslint-loader", 
        options: { 
            configFile:  path.resolve(__dirname, 'config/.eslintrc')
        },
        enforce: 'pre'
    })
}