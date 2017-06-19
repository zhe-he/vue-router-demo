var webpack = require("webpack");
var webpackBase = require("./webpack.config.js");
var cfg = Object.assign(webpackBase, {
    devtool: "cheap-module-eval-source-map"
});

var port = process.argv[2]?process.argv[2].replace('--',''):4010;

//entry 
Object.getOwnPropertyNames((webpackBase.entry || {})).map(function (name) {
    if (name != 'vendor') {
        cfg.entry[name] = []
            .concat("webpack/hot/dev-server")
            .concat(`webpack-dev-server/client?http:\/\/0.0.0.0:${port}`)
            .concat(webpackBase.entry[name])
    }
});

cfg.plugins = (webpackBase.plugins || []).concat(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
);
module.exports = cfg;

//server
var webpackDevServer = require("webpack-dev-server");
var compiler = webpack(cfg);

//init server
var app = new webpackDevServer(compiler, {
    publicPath: '',
    contentBase: './www',
    hot: true,
    disableHostCheck: true,
    stats: { colors: true, chunks: false }
});
// 监听端口
app.listen(port, '0.0.0.0', function (err) {
    if (err) {
        console.log(err);
    }
});
console.log(`listen at http:\/\/localhost:${port}`);

var child_process = require('child_process');
var cmd;
if (process.platform === 'win32') {
    cmd = 'start "%ProgramFiles%\Internet Explorer\iexplore.exe"';
} else if (process.platform === 'linux') {
    cmd = 'xdg-open';
} else if (process.platform === 'darwin') {
    cmd = 'open';
}
child_process.exec(`${cmd} "http:\/\/localhost:${port}/"`);