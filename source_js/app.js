var app = angular.module('RecipEZ', ['ngRoute', 'RecipEZControllers', 'RecipEZServices', 'checklist-model']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/home', {
    templateUrl: 'partials/home.html',
    controller: 'HomeController'
  }).
  when('/search', {
    templateUrl: 'partials/search.html',
    controller: 'SearchController'
  }).
  when('/recipes/:recipeid', {
    templateUrl: 'partials/recipe.html',
    controller: 'RecipeController'
  }).
  when('/test', {
    templateUrl: 'partials/test.html'
  }).
  otherwise({
    redirectTo: '/home'
  });
}]);
