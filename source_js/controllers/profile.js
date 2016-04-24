angular.module('RecipEZControllers').controller('ProfileController', ['$scope', '$http', '$window', 'auth', 'Search', 'Profile', '$filter', function ($scope, $http, $window, auth, Search, Profile, $filter) {	
	Profile.getUserInfo(auth.currentUser()._id).success(function(user){
		Profile.queryRecipes("{$and: [{tags: {$in:" + JSON.stringify(user.data.tags) + "}},{_id: {$nin:" + JSON.stringify(user.data.recipes) +"}}]}").success(function(data){
			$scope.recommendedRecipes = data.data;
		});

		Profile.queryRecipes("{_id: {$in:" + JSON.stringify(user.data.recipes) + "}}").success(function(data2){
			$scope.myRecipes = data2.data;
		});

	});
}]);
