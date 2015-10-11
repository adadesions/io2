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
    templateUrl : '/mainApp/comingsoon.html',
    controller : 'reportCtrl'
  })
  .when('/about', {
    templateUrl : '/mainApp/comingsoon.html',
    controller : 'aboutCtrl'
  })
  .when('/register', {
    templateUrl : '/mainApp/coursesApp/registerView.html',
    controller : 'coursesCtrl'
  })
  .when('/thankyou', {
    templateUrl : '/mainApp/coursesApp/thankyouView.html',
    controller : 'coursesCtrl'
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

  $(".navbar-nav li a").click(function(event) {
    $(".navbar-collapse").collapse('hide');
  });
});
