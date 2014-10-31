'use strict';

var fs = require('fs'),
    path = require('path'),
    extend = require('extend');

// return true if path is directory
var isDir = function (dir) {
    return fs.existsSync(dir) ? fs.lstatSync( dir ).isDirectory() : false;
};

// get namesake folder from json file
var getNamesake = function (file) {
    var folder = path.dirname(file) + '/' + path.basename( file, '.json' );

    return fs.existsSync(folder) && isDir(folder) ? folder : false;
};

// get an object with file and folder names of a folder
var getFolderElements = function (parent) {
    var elems = fs.readdirSync( parent ),
        d = {
            files : [],
            folders : []
        },
        el, i;

    // fill files and folders objects with paths
    for (i in elems) {
        el = parent + '/' + elems[i];
        if (!isDir( el )) {
            d.files.push( el );
        } else {
            // add folder only if has no namesake json
            if (!fs.existsSync( el + '.json')) {
                d.folders.push( el );
            }
        }
    }
    return d;
};


var getData = {

    // get data file and extend it with its namesake folder data
    file : function (file) {
        var config = require( file ),
            namesake = getNamesake( file );

        return namesake ? extend( config, getData.folder( namesake )) : config;
    },

    // get data from folders and files inside a folder
    folder : function (folder) {
        var elems = getFolderElements( folder ),
            result = {},
            route, fileName, i;

        // files
        for (i in elems.files) {
            route = elems.files[i];
            // get object name
            fileName = path.basename( elems.files[i], '.json' );
            // assign object data from file
            result[ fileName ] = getData.file( route );
        }

        // no namesake folders
        for (i in elems.folders) {
            route = elems.folders[i];
            // get object name
            fileName = path.basename( route );
            // assign data from folder
            result[ fileName ] = extend( result[ fileName ] || {}, getData.folder( route ));
        }

        return result;
    }
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

        configs[i] = getData.file( path.resolve( arguments[i] ));
    }

    return extend.apply( {}, configs );
};
