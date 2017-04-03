'use strict';

const Transport = require('../transport');

/**
 * Outputs log messages to the console, via a formatter function.
 * 
 * @class Console
 * @extends Transport
 * @param {number} level - The level to log at.
 * @param {function} formatter - A function that accepts the object form of the
 *      message, and returns a string to be logged via `console.log`.
 */
class Console extends Transport {
    constructor(level, formatter) {
        super(level);
        
        if ('function' === typeof formatter) {
            this.format = formatter;
        }
    }
    
    /**
     * The default format function.
     * 
     * @method Console#format
     * @param {object} message - The object form of a message to be logged.
     * @returns {string}
     */
    format(message) {
        var tags = message.hasOwnProperty('$tags') && message['$tags'].length
            ? '[' + message['$tags'].join('][') + ']'
            : '';
            
        return `[${message.time}][${message.level.toUpperCase()}]${tags} ${message.text}`;
    }
    
    /**
     * Logs a message to the console.
     * 
     * @method Console#log
     * @param {string} string - The message in JSON form.
     * @param {string} data - The message in object form.
     */
    log(string, data) {
        console[console[data.level] ? data.level : 'log'](this.format(data));
    }
}

module.exports = Console;
