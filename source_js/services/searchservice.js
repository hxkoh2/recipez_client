angular.module('RecipEZServices').factory('Search', function($http, $window) {
    return {
        getRecipes : function() {
            return $http.get('http://162.243.0.11:4000/api/recipes');
        }
    }
});