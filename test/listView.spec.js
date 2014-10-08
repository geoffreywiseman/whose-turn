/* jshint expr:true */
describe( "List View", function() {
	'use strict';

	beforeEach( module( "whoseTurnApp" ) );
	beforeEach( module( "whoseTurnViews" ) );

	var $templateCache, $compile, $scope, view;
	beforeEach( inject( function( _$templateCache_, _$compile_, $rootScope ) {
			$templateCache = _$templateCache_;
			$compile = _$compile_;
			$scope = $rootScope;
	} ) );

	function initView() {
		var html = $templateCache.get( 'views/list.html' );
		view = $compile( angular.element( html ) )( $scope );
		$scope.$digest();
	}

	it( "should be compiled", function() {
		initView();
		expect( view ).to.exist;
	} );

	describe( "initial state", function() {
		beforeEach( function() {
			initView();
		} );
		it( "should have two list items", function() {
			expectListSize( 2 );
		} );
		it( "should show loading indicator", function() {
			expectListEntryHidden( 0, false );
		} );
		it( "should hide not found", function() {
			expectListEntryHidden( 1, true );
		} );
	} );

	describe( "when list could not be retrieved", function() {
		beforeEach( function() {
			$scope.listRetrieved = false;
			initView();
		} );

		it( "should only have two list items", function() {
			expectListSize( 2 );
		} );

		it( "should hide loading indicator", function() {
			expectListEntryHidden( 0, true );
		} );

		it( "should show 'not found'", function() {
			expectListEntryHidden( 1, false );
		} );
	} );

	describe( "with list size three returned", function() {
		beforeEach( function() {
			$scope.listRetrieved = true;
			$scope.memberList = {
				name: "Test List",
				members: [
					{
						memberName: "One",
						score: 1
					},
					{
						memberName: "Two",
						score: 2
					},
					{ 
						memberName: "Three",
						score: 3
					}
				]
			};
			initView();
		} );

		it( "should have five list items", function() {
			expectListSize( 5 );
		} );

		it( "should not show the loading or not found indicators", function() {
			expectListEntryHidden( 3, true );
			expectListEntryHidden( 4, true );
		} );

	} );

	function expectListSize( size ) {
		var lis = view.find( "li" );
		expect( lis.length ).to.equal( size );
	}

	function expectListEntryHidden( index, hidden ) {
		var lis = view.find( "li" );
		expect( lis[ index ].classList.contains( 'ng-hide' ) ).to.equal( hidden );
	}

} );