angular.module('RecipEZControllers').controller('ProfileController', ['$scope', '$http', '$window', 'auth', 'Search', 'Profile', '$filter', function ($scope, $http, $window, auth, Search, Profile, $filter) {	
	$scope.getProfile = function() {
		Profile.getUserInfo(auth.currentUser()._id).success(function(user){
			var excludeRecipes = user.data.saves.concat(user.data.recipes);
			Profile.queryRecipes("where={$and: [{tags: {$in:" + JSON.stringify(user.data.tags) + "}},{_id: {$nin:" + JSON.stringify(excludeRecipes) +"}}]}").success(function(data){
				$scope.recommendedRecipes = data.data;
			});

			Profile.queryRecipes("where={_id: {$in:" + JSON.stringify(user.data.recipes) + "}}").success(function(data2){
				$scope.myRecipes = data2.data;
			});

			Profile.queryRecipes("{_id: {$in:" + JSON.stringify(user.data.saves) + "}}").success(function(data3){
				$scope.savedRecipes = data3.data;
			});

		});
	}

	$scope.getProfile();

	$scope.hoverIn = function() {
		this.hover = true;
	}

	$scope.hoverOut = function() {
		this.hover = false;
	}

	$scope.deleteRecipe = function(recipeid) {

		$http.delete("http://localhost:4000/api/recipes/"+recipeid).success(function(res) {
			console.log(res);
			$scope.user = auth.currentUser();

			var index = $scope.user.recipes.indexOf(recipeid);
			if (index !== -1) {
			    $scope.user.recipes.splice(index, 1);
			}

			auth.updateUser($scope.user).success(function() {
				$scope.getProfile();
			})

		});
	}

	$scope.unsaveRecipe = function(recipeid) {
		if(!(auth.isLoggedIn())) {
			return;
		}

		$scope.user = auth.currentUser();
		var index = $scope.user.saves.indexOf(recipeid);
		if (index !== -1) {
			$scope.user.saves.splice(index, 1);
		}

		auth.updateUser($scope.user).success(function(data) {
			auth.setToken(data.token);
			$scope.getProfile();
			return;
		})

	}

}]);
