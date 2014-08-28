(function(){
	'use strict';

	var whoseTurn = angular.module('whoseTurnApp', [ 'ngRoute', 'ngResource' ]);

	// Controllers
	whoseTurn.controller( 'ListCtrl', ['$scope', '$resource', function($scope, $resource) {
		var List = $resource( '/api/list/:listName' );
		$scope.listRetrieved = null;
		$scope.memberList = List.get( { listName: 'jedi' }, function( ) {
			console.log( "List retrieved: " + $scope.memberList.name );
			$scope.listRetrieved = true;
		}, function( ) {
			$scope.listRetrieved = false;
		} );
	}] );


	// Routes
	whoseTurn.config( [ '$routeProvider', function($router) {
			$router.when( '/list', {
					templateUrl: 'views/list.html',
					controller: 'ListCtrl'
				} );
			$router.when( '/about', {
					templateUrl: 'views/about.html'
				} );
			$router.otherwise( { redirectTo: '/list' } );
		} ] );

	// Directives
	whoseTurn.directive( 'siteHeader', function() {
			return {
				restrict: 'E',
				templateUrl: 'views/site-header.html',
				link: function( scope, element, attrs ) {
					if( attrs.title ) {
						// title, so left-aligned, smaller logo
						console.log( 'Using left-aligned smaller logo in header.' );
						element.find( 'div div' ).addClass('col-md-4').after( '<div class="col-md-4 centered"><h1>' + attrs.title + '</h1></div>' );
						element.find( 'img' ).addClass( 'smallLogo' );

						var logo = element.find('img')[0];
						logo.className='smallLogo';
					} else {
						console.log( 'Using centered larger logo in header.' );
						element.find( 'div div' ).addClass( 'col-md-4' ).addClass( 'col-md-offset-4' ).addClass( 'centered' );
					}
				}
			};
		} );
	whoseTurn.directive( 'siteFooter', function() {
			return {
				restrict: 'E',
				templateUrl: 'views/site-footer.html'
			};
		} );
})();
