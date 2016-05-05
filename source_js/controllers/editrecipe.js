angular.module('RecipEZControllers').controller('EditRecipeController', ['$scope', '$http', '$window' , '$routeParams', '$location', 'auth', '$route', function($scope, $http, $window, $routeParams, $location, auth, $route) {
	$scope.hello = "Hello!"
	$scope.showErrorMsg = false;
	$scope.tags = ['American', 'Italian', 'Chinese', 'Japanese', 'Thai', 'Indian', 'Mexican', 'Other']
	var recipeid = $routeParams.recipeid;

	$http.get("http://localhost:4000/api/recipes/"+recipeid).success(function(res) {
		$scope.recipe = res.data;
		$scope.recipe.directions = $scope.recipe.directions.join('\n');

	}).error(function(res) {

	});

	$scope.cantAdd = false;

	$scope.addIngredient = function() {
		var count = $scope.recipe.ingredients.length;
		if($scope.recipe.ingredients[count-1].name == '') {
			$scope.cantAdd = true;
			$scope.cantAddMsg = "Enter 1 ingredient at a time";
			return;
		}

		$scope.recipe.ingredients.push({name: '', unit: '', quantity: null});

	}

		$scope.removeIngredient = function(ingredient) {
		var ingID = ingredient._id;

		if($scope.recipe.ingredients.length <= 1)
			return;

		for(var i = 0; i < $scope.recipe.ingredients.length; i++) {
			if($scope.recipe.ingredients[i]._id == ingID) {
				$scope.recipe.ingredients.splice(i, 1);
				console.log("found ingredient")
				console.log($scope.recipe.ingredients)
				break;
			}
		}
	}
	


	$scope.editRecipe = function() {
		console.log("Time to edit a recipe.");
		$scope.recipe.directions = $scope.recipe.directions.split('\n')
		
		var count = $scope.recipe.ingredients.length;
		if($scope.recipe.ingredients[count-1].name == '') {
			$scope.recipe.ingredients.splice(count-1, 1);
		}

		if($scope.recipe.tags.length == 0)
			$scope.recipe.tags.push("Other");

		console.log($scope.recipe);
		// do put request
		$http.put("http://localhost:4000/api/recipes/"+recipeid, $scope.recipe).success(function(res) {
			console.log(res);
			$location.path('/profile');
			$route.reload();
		});
	}
}]);