var ngCtrl = angular.module('coursesController', ["ngSanitize"]);

ngCtrl.controller('coursesCtrl', function($scope, $http, $routeParams, $location, $window){
  $scope.page = $routeParams.page;
  $scope.location = $location.url();
  $scope.formData = {};
  $window.scrollTo(-100, -100);

  $scope.isAll = function(){
    return ($scope.page === 'all')
  };

  $http.get("contents/courses.json")
  .success(function(res){
    if($scope.isAll() || $scope.location === '/register')
      $scope.courses = res.courses;
    else{
      $scope.course = _.findWhere(res.courses, {code: $scope.page});
    }
  });


  $scope.formProc = function(){
    var undercut = $scope.formData.course.split("-");
    $scope.formData.course_code = undercut[0];
    $scope.formData.course = undercut[1];

    $scope.formData.survay = JSON.stringify($scope.formData.survay);

    $http({
        method : 'POST',
        url : '/api/register',
        data : $.param($scope.formData),
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .success(function(data){
      $scope.formData = data;

      if(!data.success){
        console.log("ERROR");
      }
      else{
        $location.url('/thankyou');
      }
    });
  };


});
