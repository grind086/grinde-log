'use strict';

/**
 * A collection of transports that GLog knows about.
 * 
 * @namespace Transports
 * @member {Console} Transports.Console
 * @member {File} Transports.File
 * @member {Stream} Transports.Stream
 */

exports.Console = require('./transports/console');
exports.File = require('./transports/file');
exports.Stream = require('./transports/stream');