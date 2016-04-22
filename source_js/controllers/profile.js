angular.module('RecipEZControllers').controller('ProfileController', ['$scope', '$http', '$window', 'auth', function ($scope, $http, $window, auth) {
	
	// $('.carousel').slick({
	// 	dots: true,
	// 	infinite: true,
	// 	speed: 300,
	// 	slidesToShow: 1,
	// 	arrows: true
	// });
	
	
	$scope.user = auth.currentUser();
	console.log($scope.user);
}]);
