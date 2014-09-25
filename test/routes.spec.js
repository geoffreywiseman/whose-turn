'use strict';

describe( "Testing Routes", function() {

	var router;

	beforeEach( function() {
		module( 'whoseTurnApp' );
		inject( function( $route ) { 
			router = $route;
		} );
	} );

	describe( "/lists/:listId route", function() {
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

} );