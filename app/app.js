var comicShrineApp = angular.module("comicShrine", ['ngRoute']);

comicShrineApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
	.when('/home', {
	    templateUrl: '/views/home.html',
		controller: 'comicShrineController'
	})
	.otherwise({
	    redirectTo: '/home'
	})
}])

comicShrineApp.controller('comicShrineController', ['$scope', '$http', function($scope, $http){
	$http.get('./data/adventure.json').then(function(response){
		$scope.comics = response.data;
		console.log($scope.comics);
	})


}])