angular.module('RecipEZControllers').controller('ProfileController', ['$scope', '$http', '$window', 'auth', function ($scope, $http, $window, auth) {
	
	$scope.user = auth.currentUser();
	console.log($scope.user);
}]);
