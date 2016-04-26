angular.module('RecipEZControllers').controller('SignUpController', ['$scope', '$http', '$window', '$location', 'auth', '$rootScope', function ($scope, $http, $window, $location, auth, $rootScope) {

	$scope.user = {};
	$scope.errorMsgShow = false;
	$scope.errorMsg = "An error has occurred."

	$scope.signUp = function () {
		$scope.hideErrorMsg();

		$scope.user.name = $scope.name;
		$scope.user.email = $scope.email;
		$scope.user.password = $scope.password;

		//console.log(auth);

		auth.signup($scope.user).success(function (response) {
			auth.setToken(response.token);
			$location.path('/profile');
			$rootScope.fields.userLoggedIn = auth.isLoggedIn();
			if($rootScope.fields.small)
				$window.location.reload();
		}).error(function (response) {
			$scope.errorMsg = response.message;
			$scope.showErrorMsg();
		});
	};

	$scope.showErrorMsg = function () {
		$scope.errorMsgShow = true;
	};

	$scope.hideErrorMsg = function () {
		$scope.errorMsgShow = false;
	};

}]);