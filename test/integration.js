var $ = require('get-me')(require, {
    fsx: 'fs-extra',
    resume: '[suspend].resume',
    win: '../src/windows'
});

$.suspend(function*() {
    $.win.registerHotkey("VK_KEY_F", ["MOD_ALT"], "node -e \"console.log('Alt+F hit!')\"");
    $.win.registerHotkey("VK_KEY_F", ["MOD_ALT", "MOD_CONTROL"], "node -e \"console.log('Ctrl+Alt+F hit!')\"");
    $.win.registerHotkey("VK_KEY_Q", ["MOD_ALT", "MOD_SHIFT"], "node -e \"console.log('Shift+Alt+Q hit!')\"");

    console.log('Global hotkeys "Alt+F", "Ctrl+Alt+F", and "Shift+Alt+Q" registered.');

    // Listen for hotkeys firing using our windows Service
    $.win.monitorHotkeys();
})();
