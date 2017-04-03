'use strict';

const Transport = require('../transport');
const fs = require('fs');

/**
 * Outputs log messages to a file as line-delimited JSON.
 * 
 * @class File
 * @extends Transport
 * @param {number} level - The level to log at.
 * @param {string} path - The path to the log file.
 * @param {object} options - Additional options to pass to `fs.createWriteStream`.
 */
class File extends Transport {
    constructor(level, path, options) {
        super(level);
        
        this.writeStream = fs.createWriteStream(path, options);
    }
    
    /**
     * Writes the JSON form of a log message to the file stream.
     * 
     * @method File#log
     * @param {string} string - The message in JSON form.
     */
    log(string) {
        this.writeStream.write(string + '\n', 'utf8');
    }
}

module.exports = File;
