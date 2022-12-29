var comicShrineApp = angular.module("comicShrine", ['ngRoute']);

comicShrineApp.config(['$routeProvider', function ($routeProvider) {
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
comicShrineApp.controller('comicShrineController', ['$scope', '$http', "$location", function ($scope, $http, $location) {
	$http.get('./data/adventure.json').then(function (response) {
		$scope.comics = response.data;
		for (let i = 0; i < $scope.comics.length; i++) {
			$scope.comics[i].coverimage = "./data/covers/" + $scope.comics[i].coverimage;
		}
	})

	//setting up the clicked forum
	$scope.setForum = function (comic) {
		alert("Called!!")
		$scope.selectedComic = {
			'Title': comic.Title
		}
		console.log(comic)
		sessionStorage.setItem('comic', JSON.stringify(comic));
		$location.path("forum")
	}

}])

comicShrineApp.controller('forumController', ['$scope', '$location', function ($scope) {
	$scope.comicInfo = JSON.parse(sessionStorage.comic);
	$scope.opened = false;
	$scope.formInclude = 'form.html'
	$scope.allthreads = [];
	$scope.addThread = function () {
		if ($scope.opened == false) {
			$scope.opened = true
		}
		else {
			$scope.formInclude = 'none'
		}
	}

	$scope.registerThread = function (tname, tdesc) {
		$scope.allthreads.push(
			{
				'Title': tname,
				'Description': tdesc
			}
		)
	}
}]);

comicShrineApp.controller('shrineDirectoryController', ['$scope', '$http', "$location", function ($scope, $http, $location) {
	$http.get('./data/Manga-Data.json').then(function (response) {
		$scope.mangalist = response.data;
	})
}]);

