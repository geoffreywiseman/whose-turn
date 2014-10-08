/* jshint expr:true */
describe( "Testing Routes", function() {
	'use strict';

	var router;

	beforeEach( function() {
		module( 'whoseTurnApp' );
		inject( function( $route ) { 
			router = $route;
		} );
	} );

	describe( "'/' route", function() {
		var route;
		beforeEach( function() {
			route = router.routes[ "/" ];
		} );
		it( "should be defined", function() {
			expect( route ).to.exist;
		} );
		it( "should have lists template", function() {
			expect( route.templateUrl ).to.equal( "views/lists.html" );
		} );
		it( "should use ListsCtrl controller", function() {
			expect( route.controller ).to.equal( "ListsCtrl" );
		} );
	} );

	describe( "'/lists/:listId' route", function() {
		var listRoute;
		beforeEach( function() {
			listRoute = router.routes[ "/lists/:listId" ];
		} );
		it( "should be defined", function() {
			expect( listRoute ).to.exist;
		} );
		it( "should have list view template", function() {
			expect( listRoute.templateUrl ).to.equal( "views/list.html" );
		} );
		it( "should have the ListCtrl controller", function() {
			expect( listRoute.controller ).to.equal( "ListCtrl" );
		} );
	} );

	describe( "'/about' route", function() {
		var route;
		beforeEach( function() {
			route = router.routes[ "/about" ];
		} );
		it( "should be defined", function() {
			expect( route ).to.exist;
		} );
		it( "should have about template", function() {
			expect( route.templateUrl ).to.equal( "views/about.html" );
		} );
	} );

} );