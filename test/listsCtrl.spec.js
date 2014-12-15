describe( "List of Lists Controller", function() {
	'use strict';

	var backend, ctrl, scope;

	// load the module
	beforeEach( module( "whoseTurnApp" ) );

	// create the controller
	beforeEach( inject( function( $controller, $rootScope, $resource ) {
		scope = $rootScope.$new();
		ctrl = $controller( 'ListsCtrl', { $scope: scope, $resource: $resource } );
	} ) );

	// get ready for mocks
	beforeEach( inject( function($injector) {
		backend = $injector.get( '$httpBackend' );
	} ) );

	afterEach( function() {
      backend.verifyNoOutstandingExpectation();
      backend.verifyNoOutstandingRequest();
    } );

	// Tests
	it( "should request /api/lists", function() {
		backend.expectGET( '/api/lists' ).respond( 200 );
		backend.flush();
	} );

	it( "should store lists in scope", function() {
		var lists = [ { _id: 1, name: "cats" }, { _id: 2, name: "rats" } ];
		backend.whenGET( '/api/lists' ).respond( 200, lists );
		backend.flush();
		scope.$digest();
		expect( scope.lists.length ).to.equal( 2 );
		expect( scope.lists[0].name ).to.equal( 'cats' );
		expect( scope.lists[1].name ).to.equal( 'rats' );
	} );
} );