interface ILoggerConfig {
    transports: Transport[];
}

class Transport {
    private _level: number;
    
    get level(): number;
    set level(level: number | string);
    
    constructor(level: number);
    private _log(str: string, data: object): void;
    log(str: string, data: object): void;
}

class Logger {
    meta: object;
    transports: Transport[];
    private _level: number;
    
    get level(): number;
    set level(level: number | string);
    
    constructor(level: number, meta?: object, config: ILoggerConfig);
    mergeMeta(...metas: meta[]): object;
    log(level: string, msg: string, meta: object): void;
    child(level: number, meta?: object, config: ILoggerConfig): Logger;
    
    static setLevels(levels: { [level: string]: number });
    
    // Default log levels
    error(msg: string, meta: object): void;
    warn(msg: string, meta: object): void;
    info(msg: string, meta: object): void;
    verbose(msg: string, meta: object): void;
    debug(msg: string, meta: object): void;
    silly(msg: string, meta: object): void;
}

class DefaultLogger extends Logger {
    version: string;
    Logger: Logger;
    Transports: { [name: string]: Transport };
    levels: { [level: string]: number };
    create(level: number, meta?: object, config: ILoggerConfig);
}

export = var GLog: DefaultLogger;
