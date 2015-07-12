var fs = require('fs');
var path = require('path');
var cp = require('child_process');
var pidfile = path.resolve(__dirname, '../hott-bg.pid');
var outlog = path.resolve(__dirname, '../hott-bg-out.log');
var errlog = path.resolve(__dirname, '../hott-bg-err.log');

require('./shutdown.js')();

module.exports = function() {
    var out = fs.openSync(outlog, 'a');
    var err = fs.openSync(errlog, 'a');
    var hott = cp.spawn('node', [
        '--harmony',
        '--harmony-proxies',
        './src/background-process.js'
    ], { detached: true, stdio: [ 'ignore', out, err ] });

    // Store pid for use by shutdown
    fs.writeFileSync(pidfile, hott.pid);
    console.log('Spawned hott daemon (pid: ' + hott.pid + ')');
    hott.unref();
};
