var app = angular.module('starter', ['ionic']);

app.controller('myCtrl', function($scope, $http, $location) {
	var page = 1;
	var tag = 'inspection';
	window.localStorage["key"] = angular.toJson(new Array());
	$scope.images = [];
	$scope.showMore = function() {
		$http.get('https://api.flickr.com/services/rest/?api_key=f75bf400c7720eb42bd8b8dd14765dfc&method=flickr.photos.search&format=json&nojsoncallback=?&tags=' + tag + '&per_page=3&page=' + page)
		.success(function(data) {
			$scope.images = $scope.images.concat(data['photos']['photo']);
			$scope.$broadcast('scroll.infiniteScrollComplete');
			console.log(data['photos']['photo'].length);
		}).error(function(data){
			console.log(data);
		});
		page++;
	};	
	$scope.search = function(){
		if ($scope.tag == '' || $scope.tag == tag)
			return;
		page = 1;
		tag = $scope.tag;
		// historic = angular.fromJson(window.localStorage["key"]);
		// historic = historic.concat(tag);
		// $location.path(tag);
		// window.localStorage["key"] = angular.toJson(historic);
		$http.get('https://api.flickr.com/services/rest/?api_key=f75bf400c7720eb42bd8b8dd14765dfc&method=flickr.photos.search&format=json&nojsoncallback=?&tags=' + tag + '&per_page=3&page=' + page).success(function(data) {
			$scope.images = data['photos']['photo'];
		}).error(function(data){
			console.log(data);
		});
	}
});