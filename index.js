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

// get the objects (files and folders) of a folder
var getFolderElements = function (parent) {
	var elems = fs.readdirSync( parent ),
		d = {
			files : [],
			folders : []
		};

	// fill files and folders objects with paths
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

	// get data file and extend it with its namesake folder data
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
		if (!arguments[i] || typeof arguments[i] !== 'string') {
			throw new Error( 'deep-json: bad file argument' );
		}

		configs[i] = getData.file( path.resolve( arguments[i] ));
	}

	return extend.apply( {}, configs );
};
