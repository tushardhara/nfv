var app = angular.module('app', ['ngRoute']);
// configure our routes
app.config(function($routeProvider) {
    $routeProvider
        // route for the home page
        .when('/', {
            templateUrl : '/assets/app/partial/user.html',
            controller  : 'userCtrl'
        })
        .when('/chassis', {
            templateUrl : '/assets/app/partial/chassis.html',
            controller  : 'chassisCtrl'
        })
        ;
});


app.factory('httpq', function($http, $q) {
  return {
    get: function() {
      var deferred = $q.defer();
      $http.get.apply(null, arguments)
      .success(deferred.resolve)
      .error(deferred.resolve);
      return deferred.promise;
    },
    post: function() {
      var deferred = $q.defer();
      $http.post.apply(null, arguments)
      .success(deferred.resolve)
      .error(deferred.resolve);
      return deferred.promise;
    }
  }
});