# grinde-log

# API

## Classes

<dl>
<dt><a href="#Logger">Logger</a></dt>
<dd></dd>
</dl>

<a name="Logger"></a>

## Logger
**Kind**: global class  

* [Logger](#Logger)
    * [new Logger()](#new_Logger_new)
    * [new Logger(level, meta, config)](#new_Logger_new)
    * _instance_
        * [.level](#Logger+level)
        * [.mergeMeta()](#Logger+mergeMeta) ⇒ <code>object</code>
        * [.log(level, msg, logmeta)](#Logger+log)
        * [.child(level, meta, config)](#Logger+child)
    * _static_
        * [.setLevels(levels)](#Logger.setLevels)

<a name="new_Logger_new"></a>

### new Logger()
Our core logger class. Contains the logging methods, and allows you to create
child logs.

<a name="new_Logger_new"></a>

### new Logger(level, meta, config)

| Param | Type | Description |
| --- | --- | --- |
| level | <code>number</code> | The level to log at |
| meta | <code>object</code> | Metadata to attach to all messages |
| config | <code>object</code> | Additional configuration for the logger |
| config.transports | <code>array</code> | Where to send our log messages. |

<a name="Logger+level"></a>

### logger.level
The current logging level. Will be converted to a number when set with a string.

**Kind**: instance property of <code>[Logger](#Logger)</code>  
**Properties**

| Name | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Logger+mergeMeta"></a>

### logger.mergeMeta() ⇒ <code>object</code>
Merges any number of metadata objects together.

**Kind**: instance method of <code>[Logger](#Logger)</code>  
**Returns**: <code>object</code> - The merged metadata.  
<a name="Logger+log"></a>

### logger.log(level, msg, logmeta)
Logs a message to the current transports if and only if Logger#level is
greater than or equal to `level`.

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type | Description |
| --- | --- | --- |
| level | <code>string</code> | The name of the current level. |
| msg | <code>string</code> | The message to be logged. |
| logmeta | <code>object</code> | Additional metadata to be logged. |

<a name="Logger+child"></a>

### logger.child(level, meta, config)
Creates a new logger using all of the same settings as the parent, unless
modified in `config`. Also merges `meta` with the parent's metadata.

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type | Description |
| --- | --- | --- |
| level | <code>number</code> | The initial level to log at. |
| meta | <code>object</code> | Permanent metadata to add to the parent's. |
| config | <code>object</code> | Extra configuration (overwrite parent's). |

<a name="Logger.setLevels"></a>

### Logger.setLevels(levels)
Sets the levels and creates the corresponding methods used by all logs
(including already instantiated ones).

**Kind**: static method of <code>[Logger](#Logger)</code>  

| Param | Type | Description |
| --- | --- | --- |
| levels | <code>object</code> | A set of levels in the form `name: level`. Lower      level means more important (error is usually 0). |
