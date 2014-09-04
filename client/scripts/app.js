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
				scope: {
					title: '@'
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
