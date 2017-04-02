'use strict';

var Defaults = require('./defaults');

class Logger {
    constructor(level, meta, config) {
        this.meta = meta || {};
        
        this.levels = config.levels || Defaults.levels;
        this.transports = config.transports || Defaults.transports;
        // this.filters = config.filters || defaultConfig.filters;
        
        this.setLevel(level);
    }
    
    setLevels(levels) {
        this.levels = levels;
        this.setLevel(this.level);
    }
    
    setLevel(level) {
        if ('string' === typeof level) {
            level = this.config[level];
        }
        
        if (isNaN(level)) {
            level = -Infinity;
        }
        
        this.level = level;
        
        Object.keys(this.levels).forEach((levelName) => {
            this[levelName] = this.levels[levelName] > level
                ? () => {}
                : this.log.bind(this, levelName);
        });
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
        if (!this.levels.hasOwnProperty(level)) {
            throw new Error('Invalid logging level "' + level + '"');
        }
        
        if (this.levels[level] > this.level) {
            return;
        }
        
        var meta = Object.assign(this.mergeMeta(this.meta, logmeta), {
            time: Date.now(),
            level: level,
            text: msg instanceof Error ? msg.message : msg
        });
        
        this.transports.forEach((transport) => {
            transport.log(JSON.stringify(meta), meta);
        });
    }
    
    child(level, meta, config) {
        if (arguments.length < 3 && 'number' !== typeof level) {
            meta = level;
            level = this.level;
        }
        
        return new Logger(
            level, 
            this.mergeMeta(this.meta, meta), 
            Object.assign({ 
                levels: this.levels, 
                transports: this.transports, 
                filters: this.filters 
            }, config)
        );
    }
}

module.exports = Logger;
