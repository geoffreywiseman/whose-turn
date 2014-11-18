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
			expectListSize( 5 );
		} );

		it( "should show three visible items", function() {
			expectListEntry( 0, "One" );
			expectListEntry( 1, "Two" );
			expectListEntry( 2, "Three" );
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
		expect( lis.length ).to.be.above( index );
		expectHidden( lis[ index ], hidden );
	}

	function expectHidden( element, hidden ) {
		expect( element.classList.contains( 'ng-hide' ) ).to.equal( hidden );
	}

	function expectListEntry( index, contents ) {
		var lis = view.find( "li" );
		expect( lis.length ).to.be.above( index );
		expectHidden( lis[ index ], false );
		
		var elements = lis[index].getElementsByClassName( "memberName" );
		expect( elements.length ).to.equal( 1 );
		expect( elements[0].textContent ).to.equal( contents );
	}

	function getFirstElementWithTagName( view, tagName ) {
		for( var index = 0; index<view.length; index++ ) {
			var item = view[index];
			if( item instanceof HTMLElement ) {
				if( item.tagName.toUpperCase() == tagName.toUpperCase() ) {
					return item;
				}
			}
		}
		return null;
	}

} );