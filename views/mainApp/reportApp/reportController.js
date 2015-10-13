var ngCtrl = angular.module('reportController', ["ngSanitize",'ngRoute']);

ngCtrl.controller('reportCtrl', function($scope, $http, $routeParams, $window, $location){
  var title =  $routeParams.title;


  $http.get("contents/reports.json")
  .success(function (res) {
    $scope.reports = res.reports;
    if(title){
      $scope.report = _.findWhere(res.reports, {'title': title});
    }
    else $scope.report = _.findWhere(res.reports, {'title': "Welcome to AdaCode"});
  });

  $scope.isIndex0n1 = function (index) {
    return _.contains([0,1], index) ? true : false;
  }

  function sticky(){
    var windowTop = $(window).scrollTop();
    var divTop = $('.report-menu').offset().top-50;
    console.log("div: "+divTop);
    console.log("windowTop: "+windowTop);
    if(windowTop > divTop) $('.report-menu').addClass('sticky');
    else $('.report-menu').removeClass('sticky')
  }

});
