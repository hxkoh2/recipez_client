angular.module('RecipEZControllers').controller('LoginController', ['$scope', '$http', '$window' , function($scope, $http, $window) {
	$scope.login = function () {
		console.log("form valid");
	};
}]);
