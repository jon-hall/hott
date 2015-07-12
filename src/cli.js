#!/usr/bin/env node

var argv = require('yargs').argv,
    op = argv._[0];

/*
    TODO: Do stuff with app and args...
*/
switch(op) {
    case 'stop':
        require('./shutdown.js')();
        break;
    default:
        require('./launcher.js')();
        break;
}
