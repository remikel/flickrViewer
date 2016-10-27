var app = angular.module('starter', ['ionic']);

app.controller('myCtrl', function($scope, $http, $location, $window) {
	    // mock des cartes dans lesquelles rechercher
	// $scope.tags = [
	// 	{ 'name' : 'Skylasher' },
	// 	{ 'name' : 'Thrashing Mossdog' },
	// 	{ 'name' : 'Zhur-Taa Druid' },
	// 	{ 'name' : 'Feral Animist' },
	// 	{ 'name' : 'Rubblebelt Maaka' },
	// 	{ 'name' : 'Mending Touch' },
	// 	{ 'name' : 'Weapon Surge' },
	// 	{ 'name' : 'Woodlot Crawler' },
	// 	{ 'name' : 'Phytoburst' },
	// 	{ 'name' : 'Smelt-Ward Gatekeepers' },
	// 	{ 'name' : 'Debt to the Deathless' },
	// 	{ 'name' : 'Woodlot Crawler' },
	// 	{ 'name' : 'Blaze Commando' },
	// 	{ 'name' : 'Uncovered Clues' }
	// ];
 
	// saisie du nom de la carte
	$scope.tags = [];

	var paramValue;
	var page;
	var tag;
		window.localStorage["key"] = angular.toJson(new Array());
	var refresh = function(){
		paramValue = $location.path();
		page = 1;
		tag = $location.path() ? $location.path().slice(1) : 'inspection';
		$scope.images = [];
		$scope.tag = tag;
		$scope.showMore();
		$scope.moredata = false;
	}
	$scope.showMore = function() {
		$http.get('https://api.flickr.com/services/rest/?api_key=f75bf400c7720eb42bd8b8dd14765dfc&method=flickr.photos.search&format=json&nojsoncallback=?&tags=' + tag + '&per_page=3&page=' + page)
		.success(function(data) {
			if (data['photos']['photo'].length == 0)
				$scope.moredata = true;
			$scope.images = $scope.images.concat(data['photos']['photo']);
			$scope.$broadcast('scroll.infiniteScrollComplete');
		}).error(function(data){
		});
		page++;
	};
	$scope.search = function(){
		if ($scope.tag == '' || $scope.tag == tag)
			return;
		tag = $scope.tag;
		if ($scope.tags.indexOf(tag) == -1)
			$scope.tags = $scope.tags.concat(tag);
		$location.path(tag);
	}
	$scope.$on('$locationChangeStart', function(event) {
		refresh();
	}); 
});