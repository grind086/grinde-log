'use strict';

var Readable = require('stream').Readable;

class Stream extends Readable {
    constructor(config) {
        super();
    }
    
    log(string, data) {
        this.push(string + '\n');
    }
}

module.exports = Stream;
