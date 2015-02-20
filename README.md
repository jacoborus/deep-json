![deep.json](https://raw.githubusercontent.com/jacoborus/deepJSON/master/brand/logo.png 'deepjson logo')
========================================================================================================

A better way to work with big json config files in node.js apps

[![Build Status](https://travis-ci.org/jacoborus/deepJSON.svg?branch=master)](https://travis-ci.org/jacoborus/deepJSON)


Why
---

Sometimes config files grow to sizes that are difficult to handle, therefore it is desirable to distribute information in different files and folders.

If you hand out your config in files inside a folder named as your main json config file, deepJSON will populate it with this folder data. deepJSON will also extend this object with the following files (and its trees) that you have passed as arguments.


Installation
------------

Install with **[npm](https://www.npmjs.org/package/deepjson)**
```
$ npm install deepjson
```

API
---

### deepjson( jsonFile1, jsonFile2, ... )

Load all the json files passed as arguments, then extend them with json files under the folders with same name. Deepjson will return a object result of extend loaded files in order.


**Parameters:**

- **jsonFile** *String*: path to file (with or without extension)
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

© 2015 [Jacobo Tabernero](https://github.com/jacoborus)

Released under [MIT License](https://raw.github.com/jacoborus/deepJSON/master/LICENSE)