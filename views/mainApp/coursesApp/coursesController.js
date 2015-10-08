var ngCtrl = angular.module('coursesController', ["ngSanitize"]);

ngCtrl.controller('coursesCtrl', function($scope, $http, $routeParams){
  $scope.page = $routeParams.page;
  $scope.isAll = function(){
    return ($scope.page === 'all')
  };


  $http.get("contents/courses.json")
  .success(function(res){
    if($scope.isAll())
      $scope.courses = res.courses;
    else{
      $scope.course = _.findWhere(res.courses, {code: $scope.page});
    }
  });

});
