angular.module('RecipEZControllers').controller('SearchController', ['$scope', '$rootScope', '$http', '$window', 'Search', '$filter', 'Profile', function($scope,  $rootScope, $http, $window, Search, $filter, Profile) {
	$scope.recipes = [];
	$scope.queriedRecipes = []
	$scope.filteredRecipes = [];
	$scope.tags = ['American', 'Italian', 'Chinese', 'Japanese', 'Thai', 'Indian', 'Mexican', 'Other'];
	$scope.times = ['0 - 30 mins', '30 mins - 1 hr', 'Over 1 hr'];
	$scope.costs = ['$0 - $10', '$10 - $20', 'Over $20'];
	$scope.selectedTags = [];
	$scope.selectedTimes = [];
	$scope.selectedCosts = [];

	$(document).foundation();

	$scope.filter = function() {
		if($rootScope.fields.query.length == 0 && $scope.selectedTimes.length == 0 && $scope.selectedTags.length == 0 && $scope.selectedCosts.length == 0) {
			Search.getRecipes().success(function(data){
				$scope.filteredRecipes = data.data;
			});
		}
		else { 
			var query = "{$and: [";
			if($rootScope.fields.query.length > 0)
				query += "{name:{$regex:/" + $rootScope.fields.query + "/i}},";
			if($scope.selectedTags.length>0)
				query += "{tags: {$in:" + JSON.stringify($scope.selectedTags) + "}},";
			if($scope.selectedTimes.length>0) {
				query += "{$or:["
				for(var i=0; i<$scope.selectedTimes.length; i++){
					if($scope.selectedTimes[i] === "0 - 30 mins")
						query += "{time: {$lt: 30}},";
					else if($scope.selectedTimes[i] === "30 mins - 1 hr")
						query += "{time: {$gte: 30, $lt: 60}},";
					else if($scope.selectedTimes[i] === "Over 1 hr")
						query += "{time: {$gte: 60}},";

				}
				query += "]},";
			}
			if($scope.selectedCosts.length>0) {
				query += "{$or:["
				for(var i=0; i<$scope.selectedCosts.length; i++){
					if($scope.selectedCosts[i] === "$0 - $10")
						query += "{cost: {$lt: 10}},";
					else if($scope.selectedCosts[i] === "$10 - $20")
						query += "{cost: {$gte: 10, $lt: 20}},";
					else if($scope.selectedCosts[i] === "Over $20")
						query += "{cost: {$gte: 20}},";

				}
				query += "]},";
			}
			query = query.substring(0, query.length-1);
			query += "]}";
			Profile.queryRecipes(query).success(function(data){
				$scope.filteredRecipes = data.data;
			});
		}
	}
	$scope.filter();

	$scope.$watch('selectedTags', $scope.filter, true);
	$scope.$watch('selectedTimes', $scope.filter, true);
	$scope.$watch('selectedCosts', $scope.filter, true);
}]);