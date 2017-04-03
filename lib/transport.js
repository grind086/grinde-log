'use strict';

var Logger = require('./logger');

/**
 * Base class for transports.
 * 
 * @class Transport
 * @param {number} level - The level to log at.
 */
class Transport {
    constructor(level) {
        this.level = level;
    }
    
    /**
     * The current logging level. Will be converted to a number when set with a 
     * string. This can be set independently of the logger's level (but the 
     * logger won't pass on any messages above its own level).
     * 
     * @property {number} level
     */
    get level() { return this._level; }
    set level(level) {
        if ('string' === typeof level) {
            level = Logger.levels[level];
        }
        
        this._level = isNaN(level) ? Infinity : level;
    }
    
    /**
     * Makes sure the message is at the appropriate level before sending it on
     * to the log method.
     * 
     * @method Transport#_log
     * @param {string} string - The message in JSON form.
     * @param {string} data - The message in object form.
     * @private
     */
    _log(string, data) {
        if (Logger.levels[data.level] <= this.level) {
            this.log(string, data);
        }
    }
    
    /**
     * Implemented by subclasses. What we actually do with the log message once
     * it's ready.
     * 
     * @method Transport#log
     * @param {string} string - The message in JSON form.
     * @param {string} data - The message in object form.
     * @abstract
     */
}

module.exports = Transport;
