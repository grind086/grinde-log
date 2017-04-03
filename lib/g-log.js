'use strict';

const Logger = require('./logger');
const Transport = require('./transport');

/**
 * The main exports. GLog is an instance of {@link Logger}, so it will have all
 * associated properties and methods.
 * 
 * @module GLog
 * @type Logger
 */
var GLog = module.exports = new Logger(Logger.levels.debug);

Object.defineProperties(GLog, {
    /**
     * @alias module:GLog.version
     * @type string
     * @readonly
     */
    version: {
        get: () => require('../package.json').version
    },
    
    /**
     * A reference to the {@link Logger} class
     * 
     * @alias module:GLog.Logger
     * @type Logger
     * @readonly
     */
    Logger: {
        get: () => Logger
    },
    
    /**
     * A reference to the {@link Transport} class
     * 
     * @alias module:GLog.Transport
     * @type Transport
     * @readonly
     */
    Transport: {
        get: () => Transport
    },
    
    /**
     * A reference to the list of transports
     * 
     * @alias module:GLog.Transports
     * @type object
     * @readonly
     */
    Transports: {
        get: () => ({
            /**
             * @alias module:GLog.Transports.Console
             * @type Console
             */
            Console: require('./transports/console'),
            
            /**
             * @alias module:GLog.Transports.File
             * @type File
             */
            File: require('./transports/file'),
            
            /**
             * @alias module:GLog.Transports.Stream
             * @type Stream
             */
            Stream: require('./transports/stream')
        })
    },
    
    /**
     * A reference to {@link Logger.levels}
     * 
     * @alias module:GLog.levels
     * @type object
     * @readonly
     */
    levels: { 
        get: () => Logger.levels
    },
    
    /**
     * Convenience method for creating new loggers.
     * 
     * @alias module:GLog.create
     * @param {number} level - The level to log at
     * @param {object} meta - Metadata to attach to all messages
     * @param {object} config - Additional configuration for the logger
     * @param {array}  config.transports - Where to send our log messages.
     * @return {Logger}
     */
    create: {
        value: (level, meta, config) => new Logger(level, meta, config)
    }
});

GLog.transports.push(new GLog.Transports.Console());
