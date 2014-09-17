(function(){
	'use strict';

	var whoseTurn = angular.module('whoseTurnApp', [ 'ngRoute', 'ngResource' ]);

	// Controllers
	whoseTurn.controller( 'ListCtrl', ['$scope', '$resource', '$routeParams', function($scope, $resource, $routeParams) {
		var List = $resource( '/api/lists/:listId' );
		$scope.listRetrieved = null;
		console.log( "Requesting list: " + $routeParams.listId );
		$scope.memberList = List.get( { listId: $routeParams.listId }, function( ) {
			console.log( "List retrieved: " + $scope.memberList.name );
			$scope.listRetrieved = true;
		}, function( ) {
			$scope.listRetrieved = false;
		} );
	} ] );

	whoseTurn.controller( 'ListsCtrl', ['$scope', '$resource', function( $scope, $resource, $routeParams ) {
		var List = $resource( '/api/lists/:listId' );
		$scope.lists = List.query( );
	} ] );


	// Routes
	whoseTurn.config( [ '$routeProvider', function($router) {
			$router.when( '/', {
				templateUrl: 'views/lists.html',
				controller: 'ListsCtrl'
			} );
			$router.when( '/lists/:listId', {
					templateUrl: 'views/list.html',
					controller: 'ListCtrl'
				} );
			$router.when( '/about', {
					templateUrl: 'views/about.html'
				} );
			$router.otherwise( { redirectTo: '/' } );
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
