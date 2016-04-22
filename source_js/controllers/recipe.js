angular.module('RecipEZControllers').controller('RecipeController', ['$scope', '$http', '$window' , '$routeParams', function($scope, $http, $window, $routeParams) {
$scope.hello = "Hey there";
var recipeid = $routeParams.recipeid;
var test_review = {username: "Lucas Ung", rating: 4, content: "This recipe was wonderful! I would make it again in a hearbeat, except next time, I'll make sure to put less water because it was a litle mushy. Kraft Mac n Cheese is the best stuff in the world"};
$http.get('http://localhost:4000/api/recipes/'+recipeid).success(function(res) {
	console.log(res.message);
	$scope.recipe = res.data;
	$scope.reviewCount = res.data.reviews.length;

	//TEST STUFF BEFORE WE GET REAL REVIEWS IN
	$scope.avgReview = 4.43; //TODO: Change this
	$scope.recipe.reviews.push(test_review);
	$scope.score = [];
	$scope.recipe.reviews.push()
	$scope.showForm = false;
	for(var i = 0; i < Math.floor($scope.avgReview); i++) {
		$scope.score.push(i);
	}

	$scope.rating;
	$scope.content;
	var newReview = {rating: $scope.rating, content: $scope.content, username: ''}
	$scope.addReview = function() {
		//TODO: get username and id from session
		var userid = '';
		var username = '';
		var newReview = {rating: $scope.rating, content: $scope.content, username: ''}
	
		// $http.put('http://localhost:4000/api/recipes/'+recipeid, {
			
		// }).success(function(res) {
		// 	$scope.recipe = res.data;
		// });
	}
})
}]);