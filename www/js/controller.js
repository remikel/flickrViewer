var app = angular.module('starter', ['ionic']);

app.controller('myCtrl', function($scope, $http, $location, $window) {
	var paramValue;
	var page;
	var tag;
	var params = {
		api_key : 'f75bf400c7720eb42bd8b8dd14765dfc',
		method : 'flickr.photos.search',
		format : 'json',
		nojsoncallback : 'true',
		per_page : 3,
	}
	// get previous research from localstorage for prediction
	$scope.tags = typeof window.localStorage["tags"] !== 'undefined' ? angular.fromJson(window.localStorage["tags"]) : [];

	// To refresh and get value
	var refresh = function(){
		paramValue = $location.path();
		page = 1;
		tag = $location.path() ? $location.path().slice(1) : 'inspection';
		$scope.images = [];
		$scope.tag = tag;
		$scope.showMore();
		$scope.moredata = false;
	}

	// Load pictures and the next
	$scope.showMore = function() {
		params.tags = tag;
		params.page = page;
		$http.get('https://api.flickr.com/services/rest/', { params : params })
		.success(function(data) {
			if (data['photos']['photo'].length == 0)
				$scope.moredata = true;
			$scope.images = $scope.images.concat(data['photos']['photo']);
			$scope.$broadcast('scroll.infiniteScrollComplete');
		}).error(function(data){
			$scope.moredata = true;
		});
		page++;
	};

	// Relocate and record research
	$scope.search = function(){
		if ($scope.tag == '' || $scope.tag == tag)
			return;
		tag = $scope.tag;
		if ($scope.tags && $scope.tags.indexOf(tag) === -1)
		{
			$scope.tags.push(tag);
			window.localStorage["tags"] = angular.toJson($scope.tags);
		}
		$location.path(tag);
	}
	$scope.$on('$locationChangeStart', function(event) {
		refresh();
	}); 
});