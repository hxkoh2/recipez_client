angular.module('RecipEZControllers').controller('NavController', ['$scope', '$rootScope' ,'$http', '$window', '$location', function($scope, $rootScope, $http, $window, $location) {
	$rootScope.fields = {
		query: ""
	};

	$scope.redirect = function(){
		if($rootScope.fields.query.length > 0)
			$location.path( "/search" );
	}
}]);
