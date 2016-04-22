angular.module('RecipEZServices').factory('Search', function($http, $window) {
    return {
        getRecipes : function() {
            return $http.get('http://localhost:4000/api/recipes');
        }
    }
});