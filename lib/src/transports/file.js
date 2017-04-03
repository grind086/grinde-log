'use strict';

const Transport = require('./transport');
const fs = require('fs');

class File extends Transport {
    constructor(level, path, options) {
        super(level);
        
        this.writeStream = fs.createWriteStream(path, options);
    }
    
    log(string) {
        this.writeStream.write(string + '\n', 'utf8');
    }
}

module.exports = File;
