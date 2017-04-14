declare module 'g-log' {
    interface ILoggerConfig {
        name?: string;
        transports?: Transport[];
    }
    
    interface IMeta {
        [key: string]: any
    }
    
    export class Logger {
        level: number;
        name: string;
        meta: IMeta;
        transports: Transport[];
        
        constructor(level: number | string, meta?: IMeta, config?: ILoggerConfig);
        mergeMeta(...metas: IMeta[]): IMeta;
        log(level: string, msg: string, meta: IMeta): void;
        child(level: number, meta?: IMeta, config?: ILoggerConfig): Logger;
        child(meta?: IMeta, config?: ILoggerConfig): Logger;
        remove(): void;
        
        static levels: { [level: string]: number };
        static logs: { [name: string]: Logger };
        static setLevels(levels: { [level: string]: number }): void;
        static nextid(): number;
        
        // Default log levels
        error(msg: string | Error, meta?: IMeta): void;
        warn(msg: string | Error, meta?: IMeta): void;
        info(msg: string | Error, meta?: IMeta): void;
        verbose(msg: string | Error, meta?: IMeta): void;
        debug(msg: string | Error, meta?: IMeta): void;
        silly(msg: string | Error, meta?: IMeta): void;
    }
    
    export class Transport {
        private _level: number;
        
        level: number;
        
        constructor(level?: number | string, ...args: any[]);
        private _log(str: string, data: IMeta): void;
        log(str: string, data: IMeta): void;
    }
    
    export var version: string;
    export var Transports: { [name: string]: { new(...args: any[]): Transport }};
    export var levels: { [level: string]: number };
    export function create(level: number, meta?: IMeta, config?: ILoggerConfig): Logger;
    export function exists(name: string): boolean;
    export function get(name: string, defaultLevel?: string | number, meta?: IMeta): Logger;
    export function remove(name: string): void;
    
    // From Logger class
    export var level: number;
    export var name: string;
    export var meta: IMeta;
    export var transports: Transport[];
    export function mergeMeta(...metas: IMeta[]): IMeta;
    export function log(level: string, msg: string, meta: IMeta): void;
    export function child(level: number | string, meta?: IMeta, config?: ILoggerConfig): Logger;
    export function child(meta?: IMeta, config?: ILoggerConfig): Logger;
    export function error(msg: string | Error, meta?: IMeta): void;
    export function warn(msg: string | Error, meta?: IMeta): void;
    export function info(msg: string | Error, meta?: IMeta): void;
    export function verbose(msg: string | Error, meta?: IMeta): void;
    export function debug(msg: string | Error, meta?: IMeta): void;
    export function silly(msg: string | Error, meta?: IMeta): void;
}
