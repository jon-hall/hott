var isWin = /^win/.test(process.platform);
if(!isWin) {
    throw new Error('Hott is currently only supported on Windows.');
}

var $ = require('get-me')(require, {
    exec: '[child_process].exec',
    resume: '[suspend].resume'
});

$.suspend.run(function*() {
    // Make sure this is a global install
    // NOTE: This is done as an exec because requiring in 'npm' seems to yield
    // the wrong prefix on windows (points to program files dir)
    var pfx = yield $.exec('npm config get prefix', $.resume()),
        check = $.path.resolve(pfx.replace(/[\r\n]+$/, ''), 'node_modules/hott');

    if($.path.normalize(check) !== $.path.normalize(__dirname)) {
        // This isn't a global install so don't setup a service
        //process.exit();
        return;
    }

    // Services can't into registering hotkeys!
    // Add a 'launcher' to run @ system startup using reg Keys
    // Launcher uses process.spawn to launch our 'service' which sets up and monitors hotkeys
    yield $.exec('REG ADD "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\' +
        'Run" /V "hott" /t REG_SZ /F /D "\\\"' +
        $.path.normalize($.path.resolve(__dirname, '../../hott')) + '\\\" /c"', $.resume());

    // Run launcher to start bg-process now
    var launcherstdout = yield $.exec('node ./src/cli.js start', $.resume());
    console.log(launcherstdout);
});
