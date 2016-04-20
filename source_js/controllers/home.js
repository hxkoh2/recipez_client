angular.module('RecipEZControllers').controller('HomeController', ['$scope', '$rootScope','$http', '$window', '$location', function($scope, $rootScope, $http, $window, $location) {
	$scope.redirectToSearch = function() {
		if($rootScope.fields.query.length > 0)
			$location.path( "/search" );
	}
	$scope.$watch('fields.query', $scope.redirectToSearch, true);
}]);
