angular.module('RecipEZControllers').controller('LoginController', ['$scope', '$http', '$window', '$location', 'auth', function ($scope, $http, $window, $location, auth) {
	
	$scope.user = {};

	$scope.login = function () {
		$scope.user.email = $scope.email;
		$scope.user.password = $scope.password;
		console.log("in the function");


		auth.login($scope.user).success(function (response) {
			auth.setToken(response.token);
			$location.path('/home');
			$window.location.reload();
		}).error(function (response) {
			console.log("error while loggin in");
			console.log(response);
			//show error message
		});


	};
}]);
