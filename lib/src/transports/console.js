'use strict';

class Console {
    constructor(formatter) {
        if ('function' === typeof formatter) {
            this.format = formatter;
        }
    }
    
    format(message) {
        var tags = message.hasOwnProperty('$tags') && message['$tags'].length
            ? '[' + message['$tags'].join('][') + ']'
            : '';
            
        return `[${message.time}][${message.level.toUpperCase()}]${tags} ${message.text}`;
    }
    
    log(string, data) {
        console[console[data.level] ? data.level : 'log'](this.format(data));
    }
}

module.exports = Console;
