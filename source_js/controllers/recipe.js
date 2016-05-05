angular.module('RecipEZControllers').controller('RecipeController', ['$scope', '$http', '$window' , '$routeParams', 'auth', function($scope, $http, $window, $routeParams, auth) {
	$scope.hello = "Hey there";
	var recipeid = $routeParams.recipeid;
	// var test_review = {username: "Lucas Ung", rating: 4, content: "This recipe was wonderful! I would make it again in a hearbeat, except next time, I'll make sure to put less water because it was a litle mushy. Kraft Mac n Cheese is the best stuff in the world"};
	$http.get('http://localhost:4000/api/recipes/'+recipeid).success(function(res) {
		console.log(res.message);
		$scope.recipe = res.data;
		$scope.showForm = false;
		$scope.showErrorMsg = false;
		$scope.errorMsg = '';
		$scope.reviewCount = res.data.reviews.length;
		$scope.saved = false;
		if(auth.isLoggedIn()) {
			$scope.user = auth.currentUser();
			var index = $scope.user.saves.indexOf(recipeid);
			if (index !== -1) {
				console.log("this is a saved recipe");
			    $scope.saved = true;
			}
		}

		var sumStars = 0;
		for(var i = 0; i < $scope.reviewCount; i++) {
			sumStars += $scope.recipe.reviews[i].rating;
		}
		$scope.avgReview = sumStars / $scope.reviewCount;

		$scope.score = [];
		for(var i = 0; i < Math.floor($scope.avgReview); i++) {
			$scope.score.push(i);
		}

		$scope.rating;
		$scope.content;
		var newReview = {rating: $scope.rating, content: $scope.content, username: ''}
		
		$scope.addReview = function() {
			//TODO: get username and id from session
			if(!(auth.isLoggedIn())) {
				$scope.showErrorMsg = true;
					$scope.errorMsg = "Please log in to write a review!"
					return;
			}

			$scope.user = auth.currentUser();
			var userid = $scope.user._id;
			for(var i = 0; i < $scope.reviewCount; i++) {
				if($scope.recipe.reviews[i].userid == userid) {
					$scope.showErrorMsg = true;
					$scope.errorMsg = "You have already written a review!"
					return;
				}
			}
			var username = $scope.user.name;
			var newReview = {rating: $scope.rating, content: $scope.content, username: username, userid: userid};
			console.log($scope.user);
			$scope.recipe.reviews.push(newReview);

			$http.put('http://localhost:4000/api/recipes/'+recipeid, $scope.recipe).success(function(res) {
				$scope.recipe = res.data;
				console.log(res);
				$scope.reviewCount = $scope.recipe.reviews.length;
			}).error(function(res) {
				console.log(res);
			});
		}

		$scope.saveRecipe = function() {
			if(!(auth.isLoggedIn())) {
				return;
			}

			$scope.user = auth.currentUser();
			$scope.user.saves.push(recipeid);
			auth.updateUser($scope.user).success(function(data) {
				$scope.saved = true;
				auth.setToken(data.token);
				return;
			})
		}

		$scope.unsaveRecipe = function() {
			if(!(auth.isLoggedIn())) {
				return;
			}

			$scope.user = auth.currentUser();
			var index = $scope.user.saves.indexOf(recipeid);
			if (index !== -1) {
				$scope.user.saves.splice(index, 1);
			}

			auth.updateUser($scope.user).success(function(data) {
				$scope.saved = false;
				auth.setToken(data.token);
				return;
			})

		}
	})
}]);