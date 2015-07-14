var $ = require('get-me')(require, {
    fsx: 'fs-extra',
    resume: '[suspend].resume',
    win: './windows'
});

module.exports = function*(opts) {
    // Read config file specified in opts
    var config = yield* readFileOrSaveDefault(opts.config, []),
        i,
        len,
        hotkey;

    // Register all of the hotkeys in the config using our windows service
    for(i = 0, len = config.length; i < len; i++) {
        hotkey = config[i];
        $.win.registerHotkey(hotkey.key, hotkey.modifiers, hotkey.cmd);
    }

    // Listen for hotkeys firing using our windows Service
    $.win.monitorHotkeys(function(err, stdout, stderr) {
        if(err || stderr) console.error(err || stderr);
        else console.log(stdout.replace(/[\r\n]+$/, ''));
    });
}

function* readFileOrSaveDefault(path, defaultValue) {
    var result;
    try {
        result = yield $.fsx.readJson(path, $.resume());
    } catch(ex) {}

    if(!result) {
        result = defaultValue;
        yield $.fsx.ensureFile(path, $.resume());
        yield $.fsx.writeJson(path, result, $.resume());
    }

    return result;
}

module.exports.Api = $.win;
