/* jshint expr:true */
describe( "List Controller", function() {
	'use strict';

	var backend, ctrl, scope;

	// load the module
	beforeEach( module( "whoseTurnApp" ) );

	// create the controller
	beforeEach( inject( function( $controller, $rootScope, $resource ) {
		scope = $rootScope.$new();
		var routeParams = { listId: "myListId" };
		ctrl = $controller( 'ListCtrl', { $scope: scope, $resource: $resource, $routeParams: routeParams } );
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
	it( "should request /api/lists/myListId", function() {
		backend.expectGET( '/api/lists/myListId' ).respond( 200 );
		backend.flush();
	} );

	it( "should change listRetrieved to true after response", function() {
		expect( scope.listRetrieved ).to.be.null;
		backend.whenGET( '/api/lists/myListId' ).respond( 200, {} );
		backend.flush();
		expect( scope.listRetrieved ).to.be.true;
	} );

	it( "should change listRetrieved to false on error", function() {
		expect( scope.listRetrieved ).to.be.null;
		backend.whenGET( '/api/lists/myListId' ).respond( 404, {} );
		backend.flush();
		expect( scope.listRetrieved ).to.be.false;
	} );

	it( "should store list in scope.memberList if returned", function() {
		var list = { name: 'My List' };
		backend.whenGET( '/api/lists/myListId' ).respond( 200, list );
		backend.flush();
		scope.$digest();
		expect( scope.memberList ).to.not.be.null;
		expect( scope.memberList.name ).to.equal( 'My List' );
	} );
} );