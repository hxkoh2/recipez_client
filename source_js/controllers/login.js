angular.module('RecipEZControllers').controller('LoginController', ['$scope', '$http', '$window', 'auth', function ($scope, $http, $window, auth) {
	
	$scope.user = {};

	$scope.login = function () {
		$scope.user.email = $scope.email;
		$scope.user.password = $scope.password;
		console.log("in the function");


		auth.login($scope.user).success(function (response) {
			console.log("logged in");
			console.log(response);
			auth.setToken(response.token);
			console.log(auth.getToken());
			//$location.path('/home');
		}).error(function (response) {
			console.log("error while loggin in");
			console.log(response);
			//show error message
		});


	};
}]);
