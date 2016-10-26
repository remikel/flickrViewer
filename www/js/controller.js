var app = angular.module('starter', ['ionic']);

app.controller('myCtrl', function($scope, $http) {
$http.get('https://api.flickr.com/services/rest/?api_key=f75bf400c7720eb42bd8b8dd14765dfc&method=flickr.photos.search&format=json&nojsoncallback=?&tags=inspection&per_page=10&page=1&extras=url').success(function(data) {
		console.log(data);
	$scope.images = data['photos']['photo'];
}).error(function(data){
	console.log(data);
});

});