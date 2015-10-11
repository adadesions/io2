var ngCtrl = angular.module('welcomeController', []);

ngCtrl.controller('welcomeCtrl', ['$scope', '$http', '$window',
  function($scope, $http, $window){
    $window.scrollTo(-100, -100);
    $scope.welcome = "Welcome to AdaCode.io";
    $scope.close = function(){
      var ele = angular.element(document.querySelector('.modal-backdrop'));
      ele.remove();
      $('body').removeClass('modal-open');
    }

    $http.get('contents/friends.json')
    .success(function (res) {
      $scope.friends = res.friends;
    });
}]);
