var cp = require('child_process');
var portfinder = require('portfinder');

function start(){
    portfinder.getPort((err, port) => {
        if (err) {
            console.log('\x1B[31m', 'portfinder getPort error, please restart\n build/dev-client.js 6-9');
        } else {
            process.env.NODE_PORT = port;
            const p = cp.fork(__dirname + '/dev-server.js');
            p.on('message', function(data){
                if(data === 'restart'){
                    p.kill('SIGINT');
                    process.env.RESTART = "restart";
                    start();
                }
            })
        }
    });
}
if(!process.send){
    start();
}