'use strict';

var GLog = exports;

GLog.version = require('../package.json').version;

GLog.Logger = require('./src/logger');
GLog.Transports = require('./src/transports');
GLog.Defaults = require('./src/defaults');

GLog.defaultLogger = new GLog.Logger(GLog.Defaults.levels.debug, {}, GLog.Defaults);

Object.keys(GLog.Defaults.levels).concat('log', 'child').forEach((method) => {
    GLog[method] = GLog.defaultLogger[method].bind(GLog.defaultLogger);
});

GLog.create = function(level, meta, config) {
    return new GLog.Logger(level, meta, config);
};
