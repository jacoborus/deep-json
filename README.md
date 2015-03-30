![deep.json](https://raw.githubusercontent.com/jacoborus/deepJSON/master/brand/logo.png 'deepjson logo')
========================================================================================================

A better way to load big json config files in node.js apps.

[deepjson.jacoborus.codes](http://deepjson.jacoborus.codes)

[![Build Status](https://travis-ci.org/jacoborus/deep-json.svg?branch=master)](https://travis-ci.org/jacoborus/deep-json)


Why
---

Sometimes config files grow to sizes that are difficult to handle, therefore it is desirable to distribute information in different files and folders rather than having a single big JSON file, you can split it up across multiple files (and directories) and deep.json puts it all back together. deep.json will also extend this object with the following files (and its trees) that you have passed as arguments.


Installation
------------

Install with **[npm](https://www.npmjs.org/package/deepjson)**
```
$ npm install deepjson
```

API
---

### deepjson( config1, config2, ... )

Load all the json files passed as arguments, then extend them with json files under the folders with same name. Deepjson will return a object result of extend loaded files in order.


**Parameters:**

- **config** *String|Object*: path to file (with or without extension) or javascript object
- **Return** *Object*: extended object


Example
-------

.jsons and folders structure:
```
├── config.json: {"appname": "Fruits app", "port": 3000}
├── production.json: {"port": 4444}
├── config (folder)
│   ├── SEO.json: {"description": "Fresh lemmons!" }
│   ├── SEO (folder)
│       ├── keywords.json: ["a", "big", "array"]
```

```js
var deepjson = require( 'deepjson' );

var defaultConfig = deepjson( 'config' );
/* {
    appname: 'Fruits app',
    port: 3000,
    SEO: {
        description: 'Fresh lemmons!',
        keywords: ['a', 'big', 'array']
    }
} */


var productionConfig = deepjson( 'config', 'production' );
/* {
    appname: 'Fruits app',
    port: 4444,
    SEO: {
        description: 'Fresh lemmons!',
        keywords: ['a', 'big', 'array']
    }
} */
```


Tests
-----

```
npm install && npm test
```

<br><br>

---

© 2015 [Jacobo Tabernero](http://jacoborus.codes)

Released under [MIT License](https://raw.github.com/jacoborus/deep-json/master/LICENSE)
