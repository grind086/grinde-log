'use strict';

class Logger {
    constructor(level, meta, config) {
        config = config || {};
        
        this.level = level;
        this.meta = meta || {};
        
        this.transports = config.transports || [];
        // this.filters = config.filters || defaultConfig.filters;
    }
    
    get level() { return this._level; }
    set level(level) {
        if ('string' === typeof level) {
            level = Logger.levels[level];
        }
        
        this._level = isNaN(level) ? Infinity : level;
    }
    
    mergeMeta() {
        var resultMeta = {};
        var tags = [];
        
        Array.prototype.slice.call(arguments).forEach((meta) => {
            if (meta && meta.hasOwnProperty('$tags')) {
                tags.push(meta['$tags']);
            }
            
            Object.assign(resultMeta, meta);
        });
        
        if (tags.length) {
            resultMeta['$tags'] = Array.prototype.concat.apply([], tags);
        }
        
        return resultMeta;
    }
    
    log(level, msg, logmeta) {
        if (!Logger.levels.hasOwnProperty(level)) {
            throw new Error('Invalid logging level "' + level + '"');
        }
        
        if (Logger.levels[level] > this.level) {
            return;
        }
        
        var meta = Object.assign(this.mergeMeta(this.meta, logmeta), {
            time: Date.now(),
            level: level,
            text: msg instanceof Error ? msg.message : msg
        });
        
        var json = JSON.stringify(meta);
        this.transports.forEach((transport) => {
            transport._log(json, meta);
        });
    }
    
    child(level, meta, config) {
        if (arguments.length < 3 && 'object' === typeof level) {
            meta = level;
            level = this.level;
        }
        
        return new Logger(
            level, 
            this.mergeMeta(this.meta, meta), 
            Object.assign({
                transports: this.transports, 
                filters: this.filters 
            }, config)
        );
    }
    
    static setLevels(levels) {
        Logger.levels = levels;
        
        var proto = Logger.prototype;
        Object.keys(levels).forEach((levelName) => {
            proto[levelName] = function() {
                var args = Array.prototype.slice.call(arguments);
                args.unshift(levelName);
                
                this.log.apply(this, args);
            };
        });
    }
}

// Use npm log levels
Logger.setLevels({
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
    silly: 5
});

module.exports = Logger;
