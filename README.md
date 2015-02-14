![deep.json](https://raw.githubusercontent.com/jacoborus/deepJSON/master/brand/logo.png 'deepjson logo')
========================================================================================================

A better way to work with big json config files

[![Build Status](https://travis-ci.org/jacoborus/deepJSON.svg?branch=master)](https://travis-ci.org/jacoborus/deepJSON)


What is this all about?
-----------------------

Sometimes config files grows to sizes difficult to handle, therefore it is desirable to distribute information in different files and folders.

If you hand out your config in files inside a folder named as main .json config file, deepJSON will populate it with this data folder. deepJSON will also extend this object with the following files (and its trees) that you have passed as arguments.


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

- **jsonFile** *String*: path to file
- **Return** *Object*: extended object


Example
-------

.jsons and folders structure:
```
├── config.json: {"appname": "Fruits app", port: 3000}
├── production.json: {port: 4444}
├── config (folder)
│   ├── SEO.json: {"description": "Fresh lemmons!" }
```

```js
var deepjson = require( 'deepjson' );

var defaultConfig = deepjson( 'config.json' );
/* {
    appname: 'Fruits app',
    port: 3000,
    SEO: {
        description': 'Fresh lemmons!'
    }
} */


var productionConfig = deepjson( 'config.json', 'production.json' );
/* {
    appname: 'Fruits app',
    port: 4444,
    SEO: {
        description': 'Fresh lemmons!'
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

© 2014 [Jacobo Tabernero](https://github.com/jacoborus)

Released under [MIT License](https://raw.github.com/jacoborus/deepJSON/master/LICENSE)