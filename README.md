# g-log

```
npm install --save g-log
```

```javascript
const GLog = require('g-log');

GLog.info('The default logger prints to the console');

// => [1491231854012][INFO] The default logger prints to the console

var child = GLog.child({ $tags: 'APP' });
child.info('Create child logs with tags and metadata');

// => [1491231854012][INFO][APP] Create child logs with tags and metadata

var fileTransport = new GLog.Transports.File('path/to/my/log.log');
child.transports.push(fileTransport);

child.info('This log will go to both the console, and the log file!', { meta: 'data' });

// => [1491231854012][INFO][APP] This log will go to both the console, and the log file!
// => {"$tags":["APP"],"meta":"data","time":1491231854012,"level":"info","text":"This log will go to both the console, and the log file!"}

var nextChild = GLog.child({ $tags: 'COMPONENT' });
nextChild.info('Tags are preserved when creating children');

// => [1491231854012][INFO][APP][COMPONENT] Tags are preserved when creating children
// => {"$tags":["APP","COMPONENT"],"meta":"data","time":1491231854012,"level":"info","text":"Tags are preserved when creating children"}
```

## Metadata

Metadata is attached to logs as simple javascript objects. There is currently
one reserved key, `$tags` which is an array of strings used as tags for the log
message. When creating child logs, this key is created by concatenating the
parent's `Logger#meta.$tags` with the child's.

# API

## Modules

<dl>
<dt><a href="#module_GLog">GLog</a> : <code><a href="#Logger">Logger</a></code></dt>
<dd><p>The main exports. GLog is an instance of <a href="#Logger">Logger</a>, so it will have all
associated properties and methods.</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#Logger">Logger</a></dt>
<dd></dd>
<dt><a href="#Transport">Transport</a></dt>
<dd></dd>
<dt><a href="#Console">Console</a> ⇐ <code><a href="#Transport">Transport</a></code></dt>
<dd></dd>
<dt><a href="#File">File</a> ⇐ <code><a href="#Transport">Transport</a></code></dt>
<dd></dd>
<dt><a href="#Stream">Stream</a> ⇐ <code><a href="#Transport">Transport</a></code></dt>
<dd></dd>
</dl>

<a name="module_GLog"></a>

## GLog : <code>[Logger](#Logger)</code>
The main exports. GLog is an instance of [Logger](#Logger), so it will have all
associated properties and methods.


* [GLog](#module_GLog) : <code>[Logger](#Logger)</code>
    * [.version](#module_GLog.version) : <code>string</code>
    * [.Logger](#module_GLog.Logger) : <code>[Logger](#Logger)</code>
    * [.Transport](#module_GLog.Transport) : <code>[Transport](#Transport)</code>
    * [.Transports](#module_GLog.Transports) : <code>object</code>
        * [.Console](#module_GLog.Transports.Console) : <code>[Console](#Console)</code>
        * [.File](#module_GLog.Transports.File) : <code>[File](#File)</code>
        * [.Stream](#module_GLog.Transports.Stream) : <code>[Stream](#Stream)</code>
    * [.levels](#module_GLog.levels) : <code>object</code>
    * [.create(level, meta, config)](#module_GLog.create) ⇒ <code>[Logger](#Logger)</code>
    * [.exists(name)](#module_GLog.exists) ⇒ <code>boolean</code>
    * [.get(name, defaultLevel)](#module_GLog.get) ⇒ <code>[Logger](#Logger)</code>
    * [.remove(name)](#module_GLog.remove)

<a name="module_GLog.version"></a>

### GLog.version : <code>string</code>
**Kind**: static property of <code>[GLog](#module_GLog)</code>  
**Read only**: true  
<a name="module_GLog.Logger"></a>

### GLog.Logger : <code>[Logger](#Logger)</code>
A reference to the [Logger](#Logger) class

**Kind**: static property of <code>[GLog](#module_GLog)</code>  
**Read only**: true  
<a name="module_GLog.Transport"></a>

### GLog.Transport : <code>[Transport](#Transport)</code>
A reference to the [Transport](#Transport) class

**Kind**: static property of <code>[GLog](#module_GLog)</code>  
**Read only**: true  
<a name="module_GLog.Transports"></a>

### GLog.Transports : <code>object</code>
A reference to the list of transports

**Kind**: static property of <code>[GLog](#module_GLog)</code>  
**Read only**: true  

* [.Transports](#module_GLog.Transports) : <code>object</code>
    * [.Console](#module_GLog.Transports.Console) : <code>[Console](#Console)</code>
    * [.File](#module_GLog.Transports.File) : <code>[File](#File)</code>
    * [.Stream](#module_GLog.Transports.Stream) : <code>[Stream](#Stream)</code>

<a name="module_GLog.Transports.Console"></a>

#### Transports.Console : <code>[Console](#Console)</code>
**Kind**: static property of <code>[Transports](#module_GLog.Transports)</code>  
<a name="module_GLog.Transports.File"></a>

#### Transports.File : <code>[File](#File)</code>
**Kind**: static property of <code>[Transports](#module_GLog.Transports)</code>  
<a name="module_GLog.Transports.Stream"></a>

#### Transports.Stream : <code>[Stream](#Stream)</code>
**Kind**: static property of <code>[Transports](#module_GLog.Transports)</code>  
<a name="module_GLog.levels"></a>

### GLog.levels : <code>object</code>
A reference to [levels](#Logger.levels)

**Kind**: static property of <code>[GLog](#module_GLog)</code>  
**Read only**: true  
<a name="module_GLog.create"></a>

### GLog.create(level, meta, config) ⇒ <code>[Logger](#Logger)</code>
Convenience method for creating new loggers.

**Kind**: static method of <code>[GLog](#module_GLog)</code>  

| Param | Type | Description |
| --- | --- | --- |
| level | <code>number</code> | The level to log at |
| meta | <code>object</code> | Metadata to attach to all messages |
| config | <code>object</code> | Additional configuration for the logger |
| config.transports | <code>array</code> | Where to send our log messages. |

<a name="module_GLog.exists"></a>

### GLog.exists(name) ⇒ <code>boolean</code>
Checks whether the named log exists.

**Kind**: static method of <code>[GLog](#module_GLog)</code>  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="module_GLog.get"></a>

### GLog.get(name, defaultLevel) ⇒ <code>[Logger](#Logger)</code>
Returns the log with `name`, instantiating it if necessary.

**Kind**: static method of <code>[GLog](#module_GLog)</code>  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 
| defaultLevel | <code>string</code> | 

<a name="module_GLog.remove"></a>

### GLog.remove(name)
Removes the named log from [logs](#Logger.logs).

**Kind**: static method of <code>[GLog](#module_GLog)</code>  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="Logger"></a>

## Logger
**Kind**: global class  

* [Logger](#Logger)
    * [new Logger(level, meta, config)](#new_Logger_new)
    * _instance_
        * [.meta](#Logger+meta)
        * [.name](#Logger+name)
        * [.transports](#Logger+transports)
        * [.level](#Logger+level)
        * [.remove](#Logger+remove)
        * [.mergeMeta()](#Logger+mergeMeta) ⇒ <code>object</code>
        * [.log(level, msg, logmeta)](#Logger+log)
        * [.child(level, meta, config)](#Logger+child)
    * _static_
        * [.levels](#Logger.levels) : <code>object</code>
        * [.logs](#Logger.logs) : <code>object</code>
        * [.setLevels(levels)](#Logger.setLevels)
        * [.nextid()](#Logger.nextid) ⇒ <code>number</code>

<a name="new_Logger_new"></a>

### new Logger(level, meta, config)
Our core logger class. Contains the logging methods, and allows you to create
child logs. In addition to the listed methods, there will be a method for
each logging level, that simply redirects to [log](#Logger+log) with a set
`level` argument (these are generated by [setLevels](#Logger.setLevels)).


| Param | Type | Description |
| --- | --- | --- |
| level | <code>number</code> | The level to log at |
| meta | <code>object</code> | Metadata to attach to all messages |
| config | <code>object</code> | Additional configuration for the logger |
| config.name | <code>string</code> | A name that we can use to retrieve our log. |
| config.transports | <code>array</code> | Where to send our log messages. Defaults      to a new [Console](#Console) transport. |

<a name="Logger+meta"></a>

### logger.meta
The metadata to attach to all messages. Keys can be overwritten in
individual logs.

**Kind**: instance property of <code>[Logger](#Logger)</code>  
**Properties**

| Name | Type |
| --- | --- |
| meta | <code>object</code> | 

<a name="Logger+name"></a>

### logger.name
The name used to refer to this log in [GLog.get](GLog.get), 
[GLog.exists](GLog.exists), and [GLog.remove](GLog.remove)

**Kind**: instance property of <code>[Logger](#Logger)</code>  
**Properties**

| Name | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="Logger+transports"></a>

### logger.transports
The array of transports used by this log.

**Kind**: instance property of <code>[Logger](#Logger)</code>  
**Properties**

| Name | Type |
| --- | --- |
| transports | <code>[Array.&lt;Transport&gt;](#Transport)</code> | 

<a name="Logger+level"></a>

### logger.level
The current logging level. Will be converted to a number when set with a string.

**Kind**: instance property of <code>[Logger](#Logger)</code>  
**Properties**

| Name | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Logger+remove"></a>

### logger.remove
Removes the reference to this log from [GLog.logs](GLog.logs).

**Kind**: instance property of <code>[Logger](#Logger)</code>  
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

<a name="Logger.levels"></a>

### Logger.levels : <code>object</code>
A set of levels in the form `name: level`. Lower level means more 
important (error is usually 0). This property should not be set directly,
instead use [setLevels](#Logger.setLevels).

**Kind**: static property of <code>[Logger](#Logger)</code>  
<a name="Logger.logs"></a>

### Logger.logs : <code>object</code>
A container that holds all instantiated logs.

**Kind**: static property of <code>[Logger](#Logger)</code>  
<a name="Logger.setLevels"></a>

### Logger.setLevels(levels)
Sets the levels and creates the corresponding methods used by all logs
(including already instantiated ones).

**Kind**: static method of <code>[Logger](#Logger)</code>  

| Param | Type | Description |
| --- | --- | --- |
| levels | <code>object</code> | A set of levels in the form `name: level`. Lower      level means more important (error is usually 0). |

<a name="Logger.nextid"></a>

### Logger.nextid() ⇒ <code>number</code>
Returns a (usually) unique id

**Kind**: static method of <code>[Logger](#Logger)</code>  
<a name="Transport"></a>

## Transport
**Kind**: global class  

* [Transport](#Transport)
    * [new Transport(level)](#new_Transport_new)
    * [.level](#Transport+level)
    * *[.log(string, data)](#Transport+log)*

<a name="new_Transport_new"></a>

### new Transport(level)
Base class for transports.


| Param | Type | Description |
| --- | --- | --- |
| level | <code>number</code> | The level to log at. |

<a name="Transport+level"></a>

### transport.level
The current logging level. Will be converted to a number when set with a 
string. This can be set independently of the logger's level (but the 
logger won't pass on any messages above its own level).

**Kind**: instance property of <code>[Transport](#Transport)</code>  
**Properties**

| Name | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Transport+log"></a>

### *transport.log(string, data)*
Implemented by subclasses. What we actually do with the log message once
it's ready.

**Kind**: instance abstract method of <code>[Transport](#Transport)</code>  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | The message in JSON form. |
| data | <code>string</code> | The message in object form. |

<a name="Console"></a>

## Console ⇐ <code>[Transport](#Transport)</code>
**Kind**: global class  
**Extends**: <code>[Transport](#Transport)</code>  

* [Console](#Console) ⇐ <code>[Transport](#Transport)</code>
    * [new Console(level, formatter)](#new_Console_new)
    * [.level](#Transport+level)
    * [.format(message)](#Console+format) ⇒ <code>string</code>
    * [.log(string, data)](#Console+log)

<a name="new_Console_new"></a>

### new Console(level, formatter)
Outputs log messages to the console, via a formatter function.


| Param | Type | Description |
| --- | --- | --- |
| level | <code>number</code> | The level to log at. |
| formatter | <code>function</code> | A function that accepts the object form of the      message, and returns a string to be logged via `console.log`. |

<a name="Transport+level"></a>

### console.level
The current logging level. Will be converted to a number when set with a 
string. This can be set independently of the logger's level (but the 
logger won't pass on any messages above its own level).

**Kind**: instance property of <code>[Console](#Console)</code>  
**Properties**

| Name | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Console+format"></a>

### console.format(message) ⇒ <code>string</code>
The default format function.

**Kind**: instance method of <code>[Console](#Console)</code>  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>object</code> | The object form of a message to be logged. |

<a name="Console+log"></a>

### console.log(string, data)
Logs a message to the console.

**Kind**: instance method of <code>[Console](#Console)</code>  
**Overrides**: <code>[log](#Transport+log)</code>  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | The message in JSON form. |
| data | <code>string</code> | The message in object form. |

<a name="File"></a>

## File ⇐ <code>[Transport](#Transport)</code>
**Kind**: global class  
**Extends**: <code>[Transport](#Transport)</code>  

* [File](#File) ⇐ <code>[Transport](#Transport)</code>
    * [new File(level, path, options)](#new_File_new)
    * [.level](#Transport+level)
    * [.log(string)](#File+log)

<a name="new_File_new"></a>

### new File(level, path, options)
Outputs log messages to a file as line-delimited JSON.


| Param | Type | Description |
| --- | --- | --- |
| level | <code>number</code> | The level to log at. |
| path | <code>string</code> | The path to the log file. |
| options | <code>object</code> | Additional options to pass to `fs.createWriteStream`. |

<a name="Transport+level"></a>

### file.level
The current logging level. Will be converted to a number when set with a 
string. This can be set independently of the logger's level (but the 
logger won't pass on any messages above its own level).

**Kind**: instance property of <code>[File](#File)</code>  
**Properties**

| Name | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="File+log"></a>

### file.log(string)
Writes the JSON form of a log message to the file stream.

**Kind**: instance method of <code>[File](#File)</code>  
**Overrides**: <code>[log](#Transport+log)</code>  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | The message in JSON form. |

<a name="Stream"></a>

## Stream ⇐ <code>[Transport](#Transport)</code>
**Kind**: global class  
**Extends**: <code>[Transport](#Transport)</code>, <code>node.Stream.Readable</code>  

* [Stream](#Stream) ⇐ <code>[Transport](#Transport)</code>
    * [new Stream(level)](#new_Stream_new)
    * [.level](#Transport+level)
    * [.log(string, data)](#Stream+log)

<a name="new_Stream_new"></a>

### new Stream(level)
Outputs log messages as a readable stream.


| Param | Type | Description |
| --- | --- | --- |
| level | <code>number</code> | The level to log at. |

<a name="Transport+level"></a>

### stream.level
The current logging level. Will be converted to a number when set with a 
string. This can be set independently of the logger's level (but the 
logger won't pass on any messages above its own level).

**Kind**: instance property of <code>[Stream](#Stream)</code>  
**Properties**

| Name | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Stream+log"></a>

### stream.log(string, data)
Pushes the log message into the stream, delimited with a newline.

**Kind**: instance method of <code>[Stream](#Stream)</code>  
**Overrides**: <code>[log](#Transport+log)</code>  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | The message in JSON form. |
| data | <code>string</code> | The message in object form. |

