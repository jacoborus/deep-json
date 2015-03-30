'use strict';

var fs = require('fs'),
	path = require('path'),
	extend = require('extend');

// return true if path is directory
var isDir = function (dir) {
	return fs.existsSync(dir) ? fs.lstatSync( dir ).isDirectory() : false;
};

// return path of folder with same name as .json file if exists
var getNamesake = function (file) {
	var folder = path.dirname(file) + '/' + path.basename( file, '.json' );
	return fs.existsSync(folder) && isDir(folder) ? folder : false;
};

// get the paths of files and folders inside a folder
var getFolderElements = function (parent) {
	var elems = fs.readdirSync( parent ),
		d = {
			files : [],
			folders : []
		};

	// get files and folders paths
	elems.forEach( function (elem) {
		var el = parent + '/' + elem;
		if (!isDir( el )) {
			d.files.push( el );
		} else if (!fs.existsSync( el + '.json')) {
			// add folder only if has no namesake json
			d.folders.push( el );
		}
	});

	return d;
};


var getData = {

	// get file data and extend it with folder data of folder with same name
	file : function (file) {
		var config = require( file ),
			namesake = getNamesake( file );

		return namesake ? extend( config, getData.folder( namesake )) : config;
	},

	// get data from folders and files inside a folder
	folder : function (folder) {
		var elems = getFolderElements( folder ),
			result = {};

		// files
		elems.files.forEach( function (route) {
			// get object name
			var fileName = path.basename( route, '.json' );
			// assign object data from file
			result[ fileName ] = getData.file( route );
		});

		// no namesake folders
		elems.folders.forEach( function (route) {
			// get object name
			var fileName = path.basename( route );
			// assign data from folder
			result[ fileName ] = extend( result[ fileName ] || {}, getData.folder( route ));
		});

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
		if (typeof arguments[i] !== 'string') {
			if (typeof arguments[i] !== 'object' || typeof arguments[i].length !== 'undefined' || arguments[i] === null) {
				throw new Error( 'deep-json: bad file argument' );
			} else {
				configs[i] = arguments[i];
			}
		} else {
			configs[i] = getData.file( path.resolve( arguments[i] ));
		}

	}

	return extend.apply( {}, configs );
};
