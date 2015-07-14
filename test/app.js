var $ = require('get-me')(require, {
    hott: '../index.js'
});

$.hott.Api.registerHotkey("VK_KEY_G", ["MOD_SHIFT"], function onShiftEightPressed() {
    console.log('Shift+G!');
});
$.hott.Api.registerHotkey("VK_UP", ["MOD_SHIFT", "MOD_ALT", "MOD_CONTROL"], {
    js: "console.log('Alt+Ctrl+Shift+Up!');"
});

var end = $.hott.Api.monitorHotkeys();
console.log('Now monitoring!');

var i = 5;
var self = setInterval(function() {
    if(!i--) {
        end();
        clearInterval(self);
        console.log('fin');
    } else {
        console.log('tick');
    }
}, 1000);
