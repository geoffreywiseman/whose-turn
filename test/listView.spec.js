'use strict';

describe( "List View", function() {
	beforeEach( module( "whoseTurnApp" ) );
	beforeEach( module( "whoseTurnViews" ) );

	var view, initView, $scope;
	beforeEach( inject( function( $templateCache, $compile, $rootScope ) {
			var html = $templateCache.get( 'views/list.html' );
			$scope = $rootScope.$new();
			view = $compile( angular.element( html ) )( $scope );
			$scope.$digest();
	} ) );

	it( "should be compiled", function() {
		expect( view ).to.exist;
	} );

	describe( "initial state", function() {
		// beforeEach( function() {
		// 	$scope.listRetrieved = null;
		// } );
		it( "should show loading indicator", function() {
			var lis = view.find( "li" );
			expect( lis.length ).to.equal( 2 );
			expect( lis[0].classList.contains( 'ng-hide' ) ).to.be.false;
		} );
		it( "should hide not found", function() {
			var lis = view.find( "li" );
			expect( lis.length ).to.equal( 2 );
			expect( lis[1].classList.contains( 'ng-hide' ) ).to.be.true;
		} );
	} );
} );