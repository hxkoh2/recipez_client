angular.module('RecipEZControllers').controller('NavController', ['$scope', '$rootScope' ,'$http', '$window', '$location', 'Search', '$filter', 'auth', function ($scope, $rootScope, $http, $window, $location, Search, $filter, auth) {

	$scope.userLoggedIn = auth.isLoggedIn();
	$scope.user = auth.currentUser();
	$scope.logout = function () {
		auth.logout();
		$location.path('/home');
		$window.location.reload();
	};



	$rootScope.fields = {
		query: ""
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
