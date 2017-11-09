const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pluginsText = new Date().toLocaleString() + '\n\r * `treasureHunt`';

const DIST = 'dist';
var srcVue = 'node_modules/vue/dist/vue.js';

const cssLoader = [
    {loader:'style-loader'},
    {loader: 'css-loader'},
    {loader: 'postcss-loader'}
];
const vueSassConfig = 'css-loader!sass-loader';
module.exports = {
    // 页面入口文件配置
    entry: {
        "vendor": ["src/libs/autosize.js",'babel-polyfill','whatwg-fetch'],
        "treasureHunt": 'src/treasureHunt.js'
    },
    // 入口文件输出配置
    output: {
        publicPath: '',
        path: path.resolve(__dirname, `../${DIST}`),
        filename: 'js/[name].js',
        chunkFilename: 'js/chunk/[name].js?[hash]',
    },
    // 插件项
    plugins: [
        new ExtractTextPlugin("css/vueStyle.css"),
        new CopyWebpackPlugin([
            {from: 'images/static/**/*'},
            {from: srcVue, to: 'js/vue.js'},
            {from: 'index.mp3', to: 'index.mp3'},
            {from: 'read.md', to: 'readme.md'}
        ]),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            // favicon: 'images/favicon.ico',
            minify: {
                minimize: false,
                removeComments: false,
                collapseWhitespace: false
            },
            inject: "body",
            hash: true,
            chunks: ["treasureHunt"],
            chunksSortMode: function (a, b) {
                var orders = ["treasureHunt"];
                return orders.indexOf(a.names[0])-orders.indexOf(b.names[0]);
            }
        }),
    ],
    module: {
        rules: [
            { test: /\.html$/, use: ['html-loader'] },
            { test: /\.js$/, exclude: /node_modules/, use: [{ loader:'babel-loader' }] },
            { test: /\.tsx?$/, use: [{ loader: 'ts-loader' }] },
            { test: /\.css$/, exclude: /libs/, use: cssLoader },
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
                exclude: /static/,
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
                include: /static/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]?[hash]'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|woff2?|svg|eot)$/,
                use: [
                    {
                        loader:'file-loader',
                        options: {
                            name: '[path][name].[ext]?[hash]'
                        }
                    }
                ]
            }
        ]
    },
    externals: {
        "vue": "Vue"
    },
    // 其他配置
    resolve: {
        modules: [
            process.cwd(),
            "node_modules"
        ],
        extensions: ['.ts','.js','.vue','.json']
    }
};

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     },
        //     mangle: false
        // }),
        new webpack.BannerPlugin(pluginsText)
    ])
} else {
    module.exports.module.rules.unshift({
        test: /\.(js|vue)$/,
        exclude: /libs/,
        loader: "eslint-loader", 
        // options: { configFile: '.eslintrc'},
        enforce: 'pre'
    })
}