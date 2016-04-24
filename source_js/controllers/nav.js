angular.module('RecipEZControllers').controller('NavController', ['$scope', '$rootScope' ,'$http', '$window', '$location', 'Search', '$filter', 'auth', function ($scope, $rootScope, $http, $window, $location, Search, $filter, auth) {
	$scope.blah = function() {console.log("blah")};
	$scope.userLoggedIn = auth.isLoggedIn();
	$scope.user = auth.currentUser();


	$scope.logout = function () {
		console.log("logged out");

		auth.logout();
		$location.path('/home');
		$rootScope.fields.userLoggedIn = auth.isLoggedIn();
	};
	$scope.logout2 = function () {
		console.log("logged out2");

		//auth.logout();
		//$location.path('/home');
		//$rootScope.fields.userLoggedIn = auth.isLoggedIn();
	};

	$rootScope.fields = {
		query: "",
		userLoggedIn: auth.isLoggedIn()
	};

	var offset = $('#nav-search').offset();
	var height = $('#nav-search').height();
	$('.search-dropdown').css('top', offset.top + height);
	$('.search-dropdown').css('left', offset.left);

	$scope.redirect = function() {
		if($rootScope.fields.query.length > 0){
			$('.search-dropdown').css('display', 'none');
			$location.path( "/search" );
		}
	}

	$scope.recommend = function() {
		if(!($rootScope.fields.query.length > 0)){
			$('.search-dropdown').css('display', 'none');
		}
		else if(!($location.path() === "/search" || $location.path() === "/home")) {
			$('.search-dropdown').css('display', 'block');
			Search.getRecipes().success(function(data){
				var recipes = data.data.map(function(recipe){
					return recipe.name;
				});
				$scope.recommendations = ($filter('filter')(recipes, $rootScope.fields.query)).slice(0,5);
			});
		}
	}

	$scope.redirectRecommendation = function(recommendation) {
		$rootScope.fields.query = recommendation;
		$('.search-dropdown').css('display', 'none');
		$location.path("/search");
	}

	$scope.$watch('fields.query', $scope.recommend, true);


}]);
