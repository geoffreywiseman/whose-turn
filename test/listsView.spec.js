/* jshint expr:true */
describe( "List of Lists View", function() {
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
		var html = $templateCache.get( 'views/lists.html' );
		view = $compile( angular.element( html ) )( $scope );
		$scope.$digest();
	}

	it( "should compile", function() {
		initView();
		expect( view ).to.exist;
	} );

	describe( "initial state", function() {
		beforeEach( function() {
			initView();
		} );
		it( "should have exactly one list item", function() {
			expectListSize( view, 1 );
		} );
		it( "should show loading indicator", function() {
			expect( view.find("li")[0] ).to.not.be.nghidden;
		} );
	} );

	describe( "while loading", function() {
		beforeEach( function() {
			$scope.lists = [];
			initView();
		} );
		it( "should have exactly one list item", function() {
			expectListSize( view, 1 );
		} );
		it( "should show loading indicator", function() {
			expect( view.find("li")[0] ).to.not.be.nghidden;
		} );
	} );

	describe( "with two lists", function() {
		beforeEach( function() {
			$scope.lists = [ { _id: 1, name: 'One' }, { _id: 2, name: 'Two' } ];
			initView();
		} );
		it( "should have three list items", function() {
			expectListSize( view, 3 );
		} );
		it( "should hide loading indicator", function() {
			expect( view.find( "li" )[0] ).to.be.nghidden;
		} );
		it( "should contain the list id and name", function() {
			expectListEntry( 1, 1, "One" );
			expectListEntry( 2, 2, "Two" );
		} );
	} );

	function expectListEntry( index, id, name ) {
		var lis = view.find( "li" );
		expect( lis.length ).to.be.above( index );

		var li = lis[index];
		expect( li ).to.not.be.nghidden;

		expect( li.children.length ).to.equal( 1 );

		var anchor = li.children.item(0);
		expect( anchor ).to.be.instanceof( HTMLAnchorElement );
		expect( anchor.href ).to.have.string( '#/lists/' + id );
		expect( anchor.innerHTML ).to.equal( name );
	}

} );