declare module 'g-log' {
    interface ILoggerConfig {
        transports: Transport[];
    }
    
    export class Logger {
        level: number;
        name: string;
        meta: object;
        transports: Transport[];
        
        constructor(level: number, meta?: object, config?: ILoggerConfig);
        mergeMeta(...metas: object[]): object;
        log(level: string, msg: string, meta: object): void;
        child(level: number, meta?: object, config?: ILoggerConfig): Logger;
        remove(): void;
        
        static levels: { [level: string]: number };
        static logs: { [name: string]: Logger };
        static setLevels(levels: { [level: string]: number }): void;
        static nextid(): number;
        
        // Default log levels
        error(msg: string, meta: object): void;
        warn(msg: string, meta: object): void;
        info(msg: string, meta: object): void;
        verbose(msg: string, meta: object): void;
        debug(msg: string, meta: object): void;
        silly(msg: string, meta: object): void;
    }
    
    export class Transport {
        private _level: number;
        
        level: number;
        
        constructor(level: number);
        private _log(str: string, data: object): void;
        log(str: string, data: object): void;
    }
    
    export var version: string;
    export var Transports: { [name: string]: new() => Transport };
    export var levels: { [level: string]: number };
    export function create(level: number, meta?: object, config?: ILoggerConfig): Logger;
    export function exists(name: string): boolean;
    export function get(name: string, defaultLevel?: string | number): Logger;
    export function remove(name: string): void;
    
    // From Logger class
    export var level: number;
    export var name: string;
    export var meta: object;
    export var transports: Transport[];
    export function mergeMeta(...metas: object[]): object;
    export function log(level: string, msg: string, meta: object): void;
    export function child(level: number, meta?: object, config?: ILoggerConfig): Logger;
    export function error(msg: string, meta: object): void;
    export function warn(msg: string, meta: object): void;
    export function info(msg: string, meta: object): void;
    export function verbose(msg: string, meta: object): void;
    export function debug(msg: string, meta: object): void;
    export function silly(msg: string, meta: object): void;
}
