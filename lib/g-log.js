'use strict';

const Logger = require('./src/logger');
const Transports = require('./src/transports');

/**
 * @namespace GLog
 * @implements Logger
 */
var GLog = module.exports = new Logger(
    Logger.levels.debug,
    {},
    { transports: [new Transports.Console()] }
);

Object.defineProperties(GLog, {
    /**
     * @member {string} GLog.version
     * @readonly
     */
    version: {
        get: () => require('../package.json').version
    },
    
    /**
     * A reference to the Logger class
     * 
     * @member {Logger} GLog.Logger
     * @readonly
     */
    Logger: {
        get: () => Logger
    },
    
    /**
     * A reference to the list of transports
     * 
     * @member {Transports} GLog.Transports
     * @readonly
     */
    Transports: {
        get: () => Transports
    },
    
    /**
     * A reference to Logger#levels
     * 
     * @member {object} GLog.levels
     * @readonly
     */
    levels: { 
        get: () => Logger.levels
    },
    
    /**
     * Convenience method for creating new loggers.
     * 
     * @method GLog.create
     * @param {number} level - The level to log at
     * @param {object} meta - Metadata to attach to all messages
     * @param {object} config - Additional configuration for the logger
     * @param {array}  config.transports - Where to send our log messages.
     */
    create: {
        value: (level, meta, config) => new Logger(level, meta, config)
    }
});
