angular.module('RecipEZServices').factory('auth', ['$http', '$window', '$location', function ($http, $window, $location) {
    var auth = {};

    auth.setToken = function (token) {
    	$window.localStorage['recipez-token'] = token;
    };

    auth.getToken = function () {
    	return $window.localStorage['recipez-token'];
    };

    auth.isLoggedIn = function () {
    	var token = auth.getToken();

    	if(token) {
    		var payload = JSON.parse($window.atob(token.split('.')[1]));
    		return payload.exp > Date.now() / 1000;
    	}
    	else return false;
    };

    auth.currentUser = function () {
    	if(auth.isLoggedIn()){
    		var token = auth.getToken();
    		var payload = JSON.parse($window.atob(token.split('.')[1]));
    		return payload.user;
    	}
    };

    auth.signup = function (user) {
    	return $http.post('http://162.243.0.11:4000/api/users', user);
    };

    auth.login = function (user) {
    	return $http.post('http://162.243.0.11:4000/api/login', user);
    };

    auth.logout = function (user) {
    	$window.localStorage.removeItem('recipez-token');
    };

    auth.updateUser = function (user) {
        return $http.put('http://162.243.0.11:4000/api/users/' + user._id, user);
    };

    return auth;

}]);