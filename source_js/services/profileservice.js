angular.module('RecipEZServices').factory('Profile', function($http, $window) {
    return {
        getUserInfo : function(userid) {
            return $http.get('http://localhost:4000/api/users/' + userid);
        },
        queryRecipes : function(query) {
            return $http.get('http://localhost:4000/api/recipes?where=' + query);
        }
    }
});