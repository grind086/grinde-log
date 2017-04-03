'use strict';

var Logger = require('../logger');

class Transport {
    constructor(level) {
        this.level = level;
    }
    
    get level() { return this._level; }
    set level(level) {
        if ('string' === typeof level) {
            level = Logger.levels[level];
        }
        
        this._level = isNaN(level) ? Infinity : level;
    }
    
    _log(string, data) {
        if (Logger.levels[data.level] <= this.level) {
            this.log(string, data);
        }
    }
}

module.exports = Transport;
