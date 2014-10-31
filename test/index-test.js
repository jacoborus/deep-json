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
		}).to.throw( 'link-json: bad file argument' );
	});
	it('Recover simple json files', function () {
		expect( deepjson( './test/assets/simple.json' ).main ).to.equal( 1 );
	});
	it('Extend values with folder named equal as json', function () {
		expect( deepjson( './test/assets/folder.json' ).file.third ).to.equal( 3 );
	});
	it('Extend values with folders with no json namesake', function () {
		expect( deepjson( './test/assets/folder.json' ).nonamesake.list[0] ).to.equal( 9 );
	});
	it('Extend values with folder and subfolders', function () {
		expect( deepjson( './test/assets/folder.json' ).nested.list[0] ).to.equal( 1 );
	});
	it('Extend first argument value with second one', function () {
		expect( deepjson( './test/assets/folder.json', './test/assets/second.json' ).main ).to.equal( 2 );
	});
	it('Extend second argument value with third one', function () {
		expect( deepjson( './test/assets/folder.json', './test/assets/second.json', './test/assets/third.json' ).main ).to.equal( 3 );
	});
});