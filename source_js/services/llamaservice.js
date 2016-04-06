angular.module('mp4Services').factory('Llamas', function($http, $window) {
    return {
        get : function() {
            var baseUrl = $window.sessionStorage.baseurl;
            console.log("in llama service2");
            return $http.get(baseUrl+'/api/llamas');
        }
    }
});