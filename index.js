'use strict';

var fs = require('fs'),
    path = require('path'),
    extend = require('extend');


var isDir = function (dir) {
    return fs.existsSync(dir) ? fs.lstatSync( dir ).isDirectory() : false;
};


// get namesake folder
var getNamesake = function (file) {
    var folder = path.dirname(file) + '/' + path.basename( file, '.json' );

    return fs.existsSync(folder) ? folder : false;
};


var getFile = function (file) {
    var config = require( file ),
        namesake = getNamesake( file );

    return namesake ? extend( config, getFolder( namesake )) : config;
};


var getFolder = function (folder) {
    var els = fs.readdirSync( folder ),
        result = {},
        route, fileName, namesake, i;

    for (i in els) {

        route = folder + '/' + els[i];

        if (!isDir( route )) {
            // get object name
            fileName = els[i].split('.')[0];
            // assign object data from file
            result[ fileName ] = getFile( route );

            // get name of child folder
            namesake = getNamesake( route );
            // assign data from folder if this exists
            if (namesake) {
                result[ fileName ] = extend( result[ fileName ], getFolder( namesake ));
            }
        }
    }

    return result;
};


module.exports = function () {
    var configs = [],
        i;

    if (!arguments.length) {
        return {};
    }

    for (i in arguments) {
        if (!arguments[i] || typeof arguments[i] !== 'string') {
            throw new Error( 'link-json: bad file argument' );
        }

        configs[i] = getFile( path.resolve( arguments[i] ));
    }

    return extend.apply( {}, configs );
};
