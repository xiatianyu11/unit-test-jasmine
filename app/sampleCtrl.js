angular.module('controllers',[])
  .controller('sampleCtrl', ['$scope','dataSvc', function($scope, dataSvc) {
    $scope.saveData = function () {
      dataSvc.save($scope.bookDetails).then(function (result) {
        $scope.bookDetails = {};
        $scope.bookForm.$setPristine();
      });
    };
    $scope.numberPattern = /^\d*$/;
  }]);