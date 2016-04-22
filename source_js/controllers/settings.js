angular.module('RecipEZControllers').controller('SettingsController', ['$scope', '$http', '$window', 'auth', function ($scope, $http, $window, auth) {

	$scope.isloggedin = auth.isLoggedIn();


	$scope.editUser = function () {
		var name = $scope.name;
		var username = $scope.username;
		var email = $scope.email;
		var interests = $scope.interests;

		auth.logout();

		//ajax update
	};
}]);
