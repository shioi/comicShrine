var comicShrineApp = angular.module("comicShrine", ['ngRoute']);

comicShrineApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
	.when('/home', {
	    templateUrl: '/views/home.html',
		controller: 'comicShrineController'
	})
	.when('/forum', {
		templateUrl: '/views/forum.html',
		controller: 'forumController'
	})
	.when('/directory', {
		templateUrl: '/views/directory.html',
		controller: 'shrineDirectoryController'
	})
	.otherwise({
	    redirectTo: '/home'
	})
}])

//displaying controller
comicShrineApp.controller('comicShrineController', ['$scope', '$http', "$location",function($scope, $http, $location){
	$http.get('https://github.com/shioi/comicShrine/blob/main/data/adventure.json').then(function(response){
		$scope.comics = response.data;
		for(let i=0;i<$scope.comics.length; i++){
			$scope.comics[i].coverimage = "https://github.com/shioi/comicShrine/tree/main/data/covers/"+$scope.comics[i].coverimage;
		}
	})

	//setting up the clicked forum
	$scope.setForum = function(comic) {
		$scope.selectedComic = {
			'Title':comic.Title
		}
		$location.path("/forum")
	}
	$scope.test = function(){
		alert("called!!!")
		console.log($scope.selectedComic);
	}
	
}])

comicShrineApp.controller('forumController', ['$scope', '$location', function($scope, $location) {}]);

comicShrineApp.controller('shrineDirectoryController', ['$scope', function($scope, $location) {}]);

