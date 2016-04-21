angular.module('RecipEZControllers').controller('SearchController', ['$scope', '$rootScope', '$http', '$window', 'Search', '$filter', function($scope,  $rootScope, $http, $window, Search, $filter) {
	$scope.recipes = [];
	$scope.queriedRecipes = []
	$scope.filteredRecipes = [];
	$scope.tags = ['American', 'Italian', 'Chinese', 'Japanese', 'Thai', 'Indian', 'Mexican', 'Other'];
	$scope.selectedTags = [];
	$scope.small = ($window.innerWidth < 640);

	$(document).foundation();

	Search.getRecipes().success(function(data){
		$scope.recipes = data.data;
		$scope.queryRecipes();
	})

	$scope.filterRecipes = function() {
		if($scope.selectedTags.length === 0){
			$scope.filteredRecipes = $scope.queriedRecipes;
		}
		else {
			$scope.filteredRecipes = $filter('filter')($scope.queriedRecipes, filterTags);
		}	
	}

	var filterTags = function(value, index, array) {
		for(var i=0; i<$scope.selectedTags.length; i++){
			if(value.tags.indexOf($scope.selectedTags[i]) >= 0)
				return true;
		}
		return false;
	}

	$scope.queryRecipes = function() {
		if($rootScope.fields.query == ""){
			$scope.queriedRecipes = $scope.recipes;
			$scope.filterRecipes();
		}
		else {
			$scope.queriedRecipes = $filter('filter')($scope.recipes, $rootScope.fields.query);
			$scope.filterRecipes();
		}
	}

	$scope.$watch('selectedTags', $scope.filterRecipes, true);
	$scope.$watch('fields.query', $scope.queryRecipes, true);
	$(window).resize(function(){
		$scope.small = ($window.innerWidth < 640);
	});
}]);