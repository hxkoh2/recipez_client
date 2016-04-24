angular.module('RecipEZControllers').controller('LoginController', ['$scope', '$http', '$window', '$location', 'auth', '$rootScope', function ($scope, $http, $window, $location, auth, $rootScope) {
	
	$scope.user = {};
	$scope.errorMsgShow = false;
	$scope.errorMsg = "An error has occurred."

	$scope.login = function () {
		$scope.user.email = $scope.email;
		$scope.user.password = $scope.password;

		auth.login($scope.user).success(function (response) {
			auth.setToken(response.token);
			$location.path('/profile');
			$rootScope.fields.userLoggedIn = auth.isLoggedIn();
			$scope.$broadcast("login");
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
