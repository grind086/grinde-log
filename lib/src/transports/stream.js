'use strict';

const Readable = require('stream').Readable;
const Transport = require('./transport');

/**
 * Outputs log messages as a readable stream.
 * 
 * @class Stream
 * @extends Transport
 * @extends node.Stream.Readable
 * @param {number} level - The level to log at.
 */
class Stream extends Transport {
    constructor(level) {
        super(level);
        Readable.call(this);
    }
    
    /**
     * Pushes the log message into the stream, delimited with a newline.
     * 
     * @method Stream#log
     * @param {string} string - The message in JSON form.
     * @param {string} data - The message in object form.
     */
    log(string, data) {
        this.push(string + '\n');
    }
}

Object.assign(Stream.prototype, Readable.prototype);

module.exports = Stream;
