'use strict';

const Logger = require('./src/logger');
const Transports = require('./src/transports');

var GLog = module.exports = new Logger(
    Logger.levels.debug,
    {},
    { transports: [new Transports.Console()] }
);

Object.defineProperties(GLog, {
    version: {
        get: () => require('../package.json').version
    },
    
    Logger: {
        get: () => Logger
    },
    Transports: {
        get: () => Transports
    },
    
    levels: { 
        get: () => Logger.levels
    },
    create: {
        value: (level, meta, config) => new Logger(level, meta, config)
    }
});
