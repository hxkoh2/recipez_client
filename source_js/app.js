var app = angular.module('mp4', ['ngRoute', 'RecipEZControllers', 'RecipEZServices']);

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
  otherwise({
    redirectTo: '/home'
  });
}]);
