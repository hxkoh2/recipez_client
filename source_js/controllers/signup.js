angular.module('RecipEZControllers').controller('SignUpController', ['$scope', '$http', '$window', '$location', 'auth', function ($scope, $http, $window, $location, auth) {

	$scope.user = {};

	$scope.signUp = function () {
		$scope.user.name = $scope.name;
		$scope.user.email = $scope.email;
		$scope.user.password = $scope.password;

		//console.log(auth);

		auth.signup($scope.user).success(function (response) {
			console.log("signed up");
			console.log(response);
			auth.setToken(response.token);
			//$location.path('/home');
		}).error(function (response) {
			console.log("error signing up");
			console.log(response);
			//show error message
		});


		//$location.path('/home');
	};
}]);