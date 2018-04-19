const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pluginsText = new Date().toLocaleString() + '\n\r * built by `zhe-he`';

const DIST = 'dist';

const cssLoader = [
    {loader:'style-loader'},
    {loader: 'css-loader'},
    {loader: 'postcss-loader'}
];
const vueSassConfig = 'css-loader!sass-loader';
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = {
    // 页面入口文件配置
    context: path.resolve(__dirname, '../'),
    entry: {
        "vendor": ['babel-polyfill','vue','vue-router','vuex','fastclick'],
        "main": 'src/main.js'
    },
    // 入口文件输出配置
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, `../${DIST}`),
        filename: 'js/[name].js',
        chunkFilename: 'js/chunk/[name].js?',
    },
    // 插件项
    plugins: [
        new ExtractTextPlugin("css/vueStyle.css"),
        new CopyWebpackPlugin([
            {from: 'images/static/**/*'}
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
            { test: /\.html$/, use: ['html-loader'] },
            { test: /\.js$/, use: [{ loader:'babel-loader' }] },
            { test: /\.tsx?$/, use: [{ loader: 'ts-loader' }] },
            { test: /\.css$/, use: cssLoader },
            { test: /\.(scss|sass)$/, use: cssLoader.concat({loader:'sass-loader'}) },
            { test: /\.(json|data)$/, use: ['json-loader'] },
            { test: /\.(txt|md)$/, use: ['raw-loader'] },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            cssModules: {
                                localIdentName: '[path][name]---[local]---[hash:base64:5]',
                                camelCase: true
                            },
                            loaders: {
                                scss: ExtractTextPlugin.extract({
                                    use: vueSassConfig,
                                    fallback: 'vue-style-loader'
                                }),
                                sass: ExtractTextPlugin.extract({
                                    use: `${vueSassConfig}?indentedSyntax`,
                                    fallback: 'vue-style-loader'
                                }),
                                css: ExtractTextPlugin.extract({
                                    use: 'css-loader',
                                    fallback: 'vue-style-loader'
                                }),
                                js: 'babel-loader'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader:'url-loader',
                options: {
                    limit: 10000,
                    publicPath: '/',
                    name: 'images/[name]-[hash:8].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    publicPath: '/',
                    name: 'media/[name]-[hash:8].[ext]'
                }
            },
            {
                test: /\.(ttf|woff2?|svg|eot)$/,
                loader:'file-loader',
                options: {
                    publicPath: '/',
                    name: 'fonts/[name]-[hash:8].[ext]'
                }
            }
        ]
    },
    // 其他配置
    resolve: {
        modules: [
            process.cwd(),
            "node_modules"
        ],
        extensions: ['.js','.vue','.json']
    },
    mode: process.env.NODE_ENV
};

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.BannerPlugin(pluginsText)
    ])
} else {
    module.exports.module.rules.unshift({
        test: /\.(js|vue)$/,
        loader: "eslint-loader", 
        enforce: 'pre',
        include: [resolve('src')],
        options: {
            formatter: require('eslint-friendly-formatter'),
            emitWarning: false
        }
    })
}