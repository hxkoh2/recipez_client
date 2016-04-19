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
  when('/login', {
    templateUrl: 'partials/login.html',
    controller: 'LoginController'
  }).
  when('/signup', {
    templateUrl: 'partials/signup.html',
    controller: 'SignUpController'
  }).
  when('/settings', {
    templateUrl: 'partials/settings.html',
    controller: 'SettingsController'
  }).
  otherwise({
    redirectTo: '/home'
  });
}]);
