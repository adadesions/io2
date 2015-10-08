var ngApp = angular.module('mainApp', ['ngRoute','welcomeController', 'coursesController']);
ngApp.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
    templateUrl : '/mainApp/welcomeApp/welcomeView.html',
    controller : 'welcomeCtrl',
    title: 'AdaCode.io'
  })
  .when('/courses/:page', {
    templateUrl : '/mainApp/coursesApp/coursesView.html',
    controller : 'coursesCtrl'
  })
  .when('/report', {
    templateUrl : '/mainApp/reportApp/reportView.html',
    controller : 'reportCtrl'
  })
  .when('/about', {
    templateUrl : '/mainApp/aboutApp/aboutView.html',
    controller : 'aboutCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });

  $locationProvider.html5Mode(true);

});

ngApp.controller('mainCtrl', function($scope, $location){
  $scope.isActive = function(viewLocation){
    var active = (viewLocation === $location.path());
    return active;
  };
});