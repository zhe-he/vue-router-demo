const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const pluginsText = new Date().toLocaleString() + '\n\r * built by `zhe-he`';

const DIST = 'dist';

const cssLoader = [
    {loader:'style-loader'},
    {loader: 'css-loader'},
    {loader: 'postcss-loader'}
];
const vueSassConfig = 'css-loader!sass-loader';
const isProduction = process.env.NODE_ENV === 'production';
const outputFilename = isProduction ? '[name]-[hash:8].[ext]' : '[name].[ext]?[hash]';
const outputJsname = isProduction ? '[name]-[chunkhash:8].js' : '[name].js';
const outputCssName = isProduction ? "css/style-[hash:8].css" : "css/style.css";
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = {
    context: path.resolve(__dirname, '../'),
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, `../${DIST}`),
        filename: 'js/' + outputJsname,
        chunkFilename: 'js/chunk/' + outputJsname
    },
    plugins: [
        new ExtractTextPlugin(outputCssName),
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
            inject: true,
            hash: !isProduction
        }),
        new webpack.optimize.SplitChunksPlugin({
            chunks: "all",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                }
            }
        }),
        isProduction ? new webpack.BannerPlugin(pluginsText) : new FriendlyErrorsPlugin()
    ],
    module: {
        rules: [
            { test: /\.js$/, include: [resolve('src')], use: [{ loader:'babel-loader' }] },
            { test: /\.tsx?$/, include: [resolve('src')], use: [{ loader: 'ts-loader' }] },
            { test: /\.css$/, use: cssLoader },
            { test: /\.(scss|sass)$/, use: cssLoader.concat({loader:'sass-loader'}) },
            { test: /\.json$/, type: "javascript/auto" },
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
                    name: 'images/' + outputFilename
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/' + outputFilename
                }
            },
            {
                test: /\.(ttf|woff2?|svg|eot)$/,
                loader:'file-loader',
                options: {
                    name: 'fonts/' + outputFilename
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
    node: {
        setImmediate: false,
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    mode: process.env.NODE_ENV
};

if (!isProduction) {
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