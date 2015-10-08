var ngCtrl = angular.module('welcomeController', []);

ngCtrl.controller('welcomeCtrl', ['$scope',
  function($scope){
    $scope.welcome = "Welcome to AdaCode.io";
    $scope.close = function(){
      var ele = angular.element(document.querySelector('.modal-backdrop'));
      ele.remove();
      $('body').removeClass('modal-open');
    }
}]);
