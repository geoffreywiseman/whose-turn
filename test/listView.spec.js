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

	it( "should compile", function() {
		initView();
		expect( view ).to.exist;
	} );

	describe( "initial state", function() {
		beforeEach( function() {
			initView();
		} );
		it( "should have two list items", function() {
			expectListSize( view, 2 );
		} );
		it( "should show loading indicator", function() {
			expect( view.find( "li" )[0] ).to.not.be.nghidden;
		} );
		it( "should hide not found", function() {
			expect( view.find( "li" )[1] ).to.be.nghidden;
		} );
	} );

	describe( "when list could not be retrieved", function() {
		beforeEach( function() {
			$scope.listRetrieved = false;
			initView();
		} );

		it( "should only have two list items", function() {
			expectListSize( view, 2 );
		} );

		it( "should hide loading indicator", function() {
			expect( view.find( "li" )[ 0 ] ).to.be.nghidden;
		} );

		it( "should show 'not found'", function() {
			expect( view.find( "li" )[ 1 ] ).to.not.be.nghidden;
		} );
	} );

	describe( "with list size three returned", function() {
		beforeEach( function() {
			$scope.listRetrieved = true;
			$scope.memberList = {
				name: "Test List",
				members: [
					{
						name: "One",
						score: 1
					},
					{
						name: "Two",
						score: 2
					},
					{ 
						name: "Three",
						score: 3
					}
				]
			};
			initView();
		} );

		it( "should display the list name", function() {
			var header = getFirstElementWithTagName( view, "site-header" );
			expect( header ).to.exist;
			expect( header.getAttribute( "title") ).to.equal( "Test List" );
		} );

		it( "should have five items (three visible, two hidden)", function() {
			expectListSize( view, 5 );
		} );

		it( "should show three visible items", function() {
			expectListEntry( 0, "One" );
			expectListEntry( 1, "Two" );
			expectListEntry( 2, "Three" );
		} );

		it( "should not show the loading or not found indicators", function() {
			var lis = view.find( "li" );
			expect( lis.length ).to.be.above( 4 );
			expect( lis[ 3 ] ).to.be.nghidden;
			expect( lis[ 4 ] ).to.be.nghidden;
		} );

	} );

	function expectListEntry( index, contents ) {
		var lis = view.find( "li" );
		expect( lis.length ).to.be.above( index );
		expect( lis[ index ] ).to.not.be.nghidden;
		
		var elements = lis[index].getElementsByClassName( "memberName" );
		expect( elements.length ).to.equal( 1 );
		expect( elements[0].textContent ).to.equal( contents );
	}

} );