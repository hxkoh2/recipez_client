var app = angular.module('RecipEZ', ['ngRoute', 'RecipEZControllers', 'RecipEZServices', 'checklist-model', 'slick']);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.
    when('/home', {
    templateUrl: 'partials/home.html'
  }).
  when('/search', {
    templateUrl: 'partials/search.html',
    controller: 'SearchController'
  }).
  when('/recipes/:recipeid', {
    templateUrl: 'partials/recipe.html',
    controller: 'RecipeController'
  }).
  when('/login', {
    templateUrl: 'partials/login.html',
    controller: 'LoginController',
    resolve: ['$location', 'auth', function ($location, auth) {
      if(auth.isLoggedIn())
        $location.path('/home');
    }]
  }).
  when('/signup', {
    templateUrl: 'partials/signup.html',
    controller: 'SignUpController',
    resolve: ['$location', 'auth', function ($location, auth) {
      if(auth.isLoggedIn())
        $location.path('/home');
    }]
  }).
  when('/settings', {
    templateUrl: 'partials/settings.html',
    controller: 'SettingsController',
    resolve: ['$location', 'auth', function ($location, auth) {
      if(!auth.isLoggedIn())
        $location.path('/login');
    }]
  }).
  when('/profile', {
    templateUrl: 'partials/profile.html',
    controller: 'ProfileController',
    resolve: ['$location', 'auth', function ($location, auth) {
      if(!auth.isLoggedIn())
        $location.path('/login');
    }]
  }).
  otherwise({
    redirectTo: '/home'
  });
}]);
