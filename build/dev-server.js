const path = require('path');
const express = require('express');
const webpack = require('webpack');
const opn = require('opn');
const proxyMiddleware = require('http-proxy-middleware');
const webpackBase = require("./index");
var cfg = Object.assign(webpackBase, {
    devtool: "cheap-module-eval-source-map"
});

const port = 4010;
const app = express();

cfg.plugins = (webpackBase.plugins || []).concat(
    new webpack.HotModuleReplacementPlugin()
);

// css-hot-loader
for (var i = 0; i < cfg.module.rules.length; i++) {
    let item = cfg.module.rules[i];
    if (/\.vue/.test(item.test) && item.enforce != "pre") {
        cfg.module.rules[i].use[0].options.loaders.scss = ['css-hot-loader'].concat(item.use[0].options.loaders.scss);
        cfg.module.rules[i].use[0].options.loaders.sass = ['css-hot-loader'].concat(item.use[0].options.loaders.sass);
        cfg.module.rules[i].use[0].options.loaders.css = ['css-hot-loader'].concat(item.use[0].options.loaders.css);
    }
}

// other file change
var chokidar = require('chokidar');
chokidar.watch(__dirname+ '/index.js').on('change', function(){
    process.send('restart');
})

//entry
Object.getOwnPropertyNames((webpackBase.entry || {})).map(function (name) {
    cfg.entry[name] = []
        .concat("webpack-hot-middleware/client")
        .concat(webpackBase.entry[name])
});
var compiler = webpack(cfg);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackBase.output.publicPath,
    noInfo: true,
    hot: true,
    stats: {
        colors: true,
        chunks: false
    }
});


var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.hooks.compilation.tap('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({
            action: 'reload'
        })
        cb()
    })
})

app.use(require('connect-history-api-fallback')());
app.use(devMiddleware);
app.use(hotMiddleware);


module.exports = app.listen(port, function(err) {
    if (err) {
        console.log(err)
        return
    }
    var url = 'http://localhost:' + port;
    console.log('Listening at ' + url + '\n')
    if (process.env.RESTART !== "restart") {
        opn(url);
    }
});