'use strict';

describe( "Testing Modules", function() {

	describe( "WhoseTurn Module", function() {

		var module;

		before( function() {
			module = angular.module( 'whoseTurnApp' );
		} );

		it( "should be registered", function() {
			expect( module ).not.to.equal( null );
		} );

	} );	

});