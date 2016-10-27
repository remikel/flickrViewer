var app = angular.module('starter', ['ionic']);

app.controller('myCtrl', function($scope, $http, $location, $window) {
	var paramValue;
	var page;
	var tag;
	var refresh = function(){
		paramValue = $location.path();
		page = 1;
		tag = $location.path() ? $location.path().slice(1) : 'inspection';
		window.localStorage["key"] = angular.toJson(new Array());
		$scope.images = [];
		$scope.tag = tag;
		$scope.showMore();
	}
	$scope.showMore = function() {
		$http.get('https://api.flickr.com/services/rest/?api_key=f75bf400c7720eb42bd8b8dd14765dfc&method=flickr.photos.search&format=json&nojsoncallback=?&tags=' + tag + '&per_page=3&page=' + page)
		.success(function(data) {
			$scope.images = $scope.images.concat(data['photos']['photo']);
			$scope.$broadcast('scroll.infiniteScrollComplete');
		}).error(function(data){
		});
		page++;
	};
	refresh();	
	$scope.search = function(){
		if ($scope.tag == '' || $scope.tag == tag)
			return;
		tag = $scope.tag;
		// historic = angular.fromJson(window.localStorage["key"]);
		// historic = historic.concat(tag);
		// window.localStorage["key"] = angular.toJson(historic);
		$location.path(tag);
		refresh();
	}
	$scope.$on('$pathChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

	console.log("State changed: ", toState);

		$scope.refreshItems();
	});
	$scope.$on('$locationChangeStart', function(event) {
		console.log("State changed: ");
		refresh();
	    // $scope.refreshItems();
	}); 
});