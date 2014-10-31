deepJSON
========

Arrange big json configs along folders and files

[![Build Status](https://travis-ci.org/jacoborus/deepJSON.svg?branch=master)](https://travis-ci.org/jacoborus/deepJSON)


Installation
------------

Install with **[npm](https://www.npmjs.org/package/deepjson)**
```
$ npm install deepjson
```


Example
-------

.jsons and folders structure:
```
├── config.json {"appname": "Fruits app", port: 3000}
├── config (folder)
│   ├── SEO.json {"title": "Greengrocer", "description": "Fresh lemmons!" }
│   ├── SEO (folder)
│   │   ├── keywords.json : ["apples", "oranges", "lemmons"]
├── production.json {port: 4444}
```

```js
var deepjson = require( 'deepjson' );

var defaultConfig = deepjson( 'config.json' );
/* {
    appname: 'Fruits app',
    port: 3000,
    SEO: {
        title: 'Greengrocer',
        description': 'Fresh lemmons!'
        keywords: ['apples', 'oranges', 'lemmons']
    }
} */


var productionConfig = deepjson( 'config.json', 'production.json' );
/* {
    appname: 'Fruits app',
    port: 4444,
    SEO: {
        title: 'Greengrocer',
        description': 'Fresh lemmons!'
        keywords: ['apples', 'oranges', 'lemmons']
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

© 2014 [jacoborus](https://github.com/jacoborus)

Released under [MIT License](https://raw.github.com/jacoborus/deepjson/master/LICENSE)