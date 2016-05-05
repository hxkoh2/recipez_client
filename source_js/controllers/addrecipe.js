angular.module('RecipEZControllers').controller('AddRecipeController', ['$scope', '$http', '$window' , '$routeParams', '$location', 'auth', function($scope, $http, $window, $routeParams, $location, auth) {
	$scope.hello = "Hello!"
	$scope.showErrorMsg = false;
	$scope.tags = ['American', 'Italian', 'Chinese', 'Japanese', 'Thai', 'Indian', 'Mexican', 'Other']
	
	$scope.recipe = {};
	$scope.recipe.name = '';
	$scope.recipe.image = '';
	$scope.recipe.description = '';
	$scope.recipe.ingredients = [{name: '', unit: '', quantity: null}];
	$scope.recipe.directions = '';
	$scope.recipe.time;
	$scope.recipe.cost;
	$scope.recipe.tags = [];
	$scope.recipe.reviews = [];

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
				break;
			}
		}
	}


	$scope.addRecipe = function() {
		console.log("Time to add a recipe.");

		$scope.recipe.directions = $scope.recipe.directions.split('\n');

		var count = $scope.recipe.ingredients.length;
		if($scope.recipe.ingredients[count-1].name == '') {
			$scope.recipe.ingredients.splice(count-1, 1);
		}

		if($scope.recipe.tags.length == 0)
			$scope.recipe.tags.push("Other");

		console.log($scope.recipe);
		//do post request and users put request on success
		$http.post("http://localhost:4000/api/recipes", $scope.recipe).success(function(res) {
			console.log(res);
			$scope.user = auth.currentUser();
			$scope.user.recipes.push(res.data._id)

			auth.updateUser($scope.user).success(function (response) {
				auth.setToken(response.token);
				$scope.errorMsg = response.message;
			}).error(function (response) {
				$scope.errorMsg = response.message;
			});
		});
		$location.path('/profile');
	}
}]);