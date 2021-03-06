var expect = require('chai').expect,
	deepjson = require('../index.js'),
	fs = require('fs');


describe( 'deepJSON', function () {

	it('Return an empty object if no arguments are passed', function () {
		expect( deepjson() ).to.be.a( 'object' );
	});
	it('Requires a master json file', function () {
		expect( function () {
			deepjson(4);
		}).to.throw( 'deep-json: bad file argument' );
	});
	it('Recover simple json files', function () {
		expect( deepjson( './test/assets/simple' ).main ).to.equal( 1 );
	});
	it('Extend values with folder named equal as json', function () {
		expect( deepjson( './test/assets/folder' ).file.third ).to.equal( 3 );
	});
	it('Extend values with folders with no json namesake', function () {
		expect( deepjson( './test/assets/folder' ).nonamesake.list[0] ).to.equal( 9 );
	});
	it('Extend values with folder and subfolders', function () {
		expect( deepjson( './test/assets/folder' ).nested.list[0] ).to.equal( 1 );
	});
	it('Extend first argument value with second one', function () {
		expect( deepjson( './test/assets/folder', './test/assets/second' ).main ).to.equal( 2 );
	});
	it('Extend second argument value with third one', function () {
		expect( deepjson( './test/assets/folder', './test/assets/second', './test/assets/third' ).main ).to.equal( 3 );
	});
	it('allow objects as params', function () {
		expect( deepjson({ secondary: 2 }, './test/assets/simple' ).secondary ).to.equal( 2 );
	});
});