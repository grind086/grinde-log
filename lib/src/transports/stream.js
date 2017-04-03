'use strict';

const Readable = require('stream').Readable;
const Transport = require('./transport');

class Stream extends Transport {
    constructor(level) {
        super(level);
        Readable.call(this);
    }
    
    log(string, data) {
        this.push(string + '\n');
    }
}

Object.assign(Stream.prototype, Readable.prototype);

module.exports = Stream;
