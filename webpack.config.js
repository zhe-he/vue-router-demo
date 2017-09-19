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
        "vendor": ['babel-polyfill'],
        "main": 'src/main.js'
    },
    // 入口文件输出配置
    output: {
        // publicPath: '',
        path: path.resolve(__dirname, DIST),
        filename: 'js/[name].js',
        chunkFilename: 'js/chunk/[name].js?[hash]',
    },
    // 插件项
    plugins: [
        new CopyWebpackPlugin([
            {from: 'images/tmp/**/*'},
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
            {test: /\.html$/,use: ['html-loader']},
            {
                test: /\.js$/,
                exclude:/node_modules|libs/,
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
                use:[{ loader: 'ts-loader' }]
            },
            {
                test: /\.css$/,
                exclude:/libs/,
                use: loaders
            },
            {
                test: /\.(scss|sass)$/,
                use: loaders.concat({loader:'sass-loader'})
            },
            {
                test: /\.vue$/,
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
            {test: /\.(json|data)$/,use: ['json-loader']},
            {test: /\.(txt|md)$/,use: ['raw-loader']},
            {
                test: /\.(png|jpe?g|gif)$/,
                exclude:/tmp/,
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
                use: [
                    {
                        loader:'url-loader',
                        options: {
                            limit: 1,
                            name: '[path][name].[ext]?[hash]'
                        }
                    }
                ]
            }
        ]
    },
    externals: {
        "vue": "Vue",
        "vuex": "Vuex",
        "vue-router": "VueRouter"
    },
    // 其他配置
    resolve: {
        modules: [
            process.cwd(),
            "node_modules"
        ],
        extensions: ['.ts','.js','.vue'],
        alias: {
            "inter":            "src/data/inter.js",
            "method":           "src/modules/method.js",
            "msg":              "src/modules/msg.vue",
            "WFApp":            "src/modules/WFApp.js",
            "loading":          "src/modules/loading"
        }
    }
};

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = (module.exports.plugins || []).concat([
    new CopyWebpackPlugin([
        {from: 'node_modules/vue/dist/vue.min.js',to:'js/vue.js'},
        {from: 'node_modules/vuex/dist/vuex.min.js',to:'js/vue.js'},
        {from: 'node_modules/vue-router/dist/vue-router.min.js',to:'js/vue-router.js'}
    ]),
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
  ])
} else {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new CopyWebpackPlugin([
            {from: 'node_modules/vue/dist/vue.js',to:'js/vue.js'},
            {from: 'node_modules/vuex/dist/vuex.js',to:'js/vuex.js'},
            {from: 'node_modules/vue-router/dist/vue-router.min.js',to:'js/vue-router.js'}
        ])
    ]);
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