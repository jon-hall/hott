var fs = require('fs');
var path = require('path');
var cp = require('child_process');
var pid;

module.exports = function() {
    var pidfile = path.resolve(__dirname, '../hott-bg.pid');
    try { pid = +fs.readFileSync(pidfile, 'utf8'); } catch(ex) { }

    // See if the process is already running and shut it down if so
    if(pid) {
        console.log('Shutting down old process (pid: ' + pid + ')...');
        var procInfo = cp.execSync('WMIC path win32_process get Processid,' +
            'Commandline | FIND "' + pid + '"').toString().split(/\s/g).map(function(nl) {
                return nl.trim();
            }).filter(function(l) { return !!l; });

        var oldProcessArgs = ['node', '--harmony', '--harmony-proxies',
            './background-process.js', '' + pid];

        var isOldProcess = procInfo.every(function(pi, i) {
            if(!oldProcessArgs[i]) return true;
            return (pi === oldProcessArgs[i]);
        });

        if(isOldProcess) {
            // Kill the process
            cp.execSync('taskkill /pid ' + pid + ' /f');
            console.log('Old process shutdown.');
        } else {
            console.log('Old process not found.');
        }

        fs.writeFileSync(pidfile, '');
    }
};
