angular.module('RecipEZControllers').controller('NavController', ['$scope', '$rootScope' ,'$http', '$window', '$location', 'Search', '$filter', 'auth', '$route', function ($scope, $rootScope, $http, $window, $location, Search, $filter, auth, $route) {
	$rootScope.fields = {
		query: "",
		userLoggedIn: auth.isLoggedIn(),
		small: ($window.innerWidth < 640), 
		user: auth.currentUser()
	};

	$scope.logout = function () {
		auth.logout();
		$location.path('/home');
		$rootScope.fields.userLoggedIn = auth.isLoggedIn();
		if($rootScope.fields.small)
			$window.location.reload();
	};

	var offset = $('#nav-search').offset();
	var height = $('#nav-search').height();
	$('.search-dropdown').css('top', offset.top + height);
	$('.search-dropdown').css('left', offset.left);

	$scope.redirect = function() {
		if($rootScope.fields.query.length > 0){
			$('.search-dropdown').css('display', 'none');
			$location.path( "/search" );
			$route.reload();
		}
		else if($location.path() === "/search") {
			$route.reload();
		}
	}

	$scope.recommend = function() {
		if(!($rootScope.fields.query.length > 0)){
			$('.search-dropdown').css('display', 'none');
		}
		else {
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

	$(window).resize(function(){
		$rootScope.fields.small = ($window.innerWidth < 640);
	});

	$scope.$watch('fields.query', $scope.recommend, true);
}]);
