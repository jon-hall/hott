var $ = require('get-me')(require, {
    hott: '../index.js'
});

$.suspend($.hott)({
    config: $.path.resolve(process.env.USERPROFILE, '.hott')
});
