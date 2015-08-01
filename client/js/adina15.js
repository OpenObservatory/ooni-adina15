'use strict';

// Declare app level module which depends on views, and components
angular
  .module('adina15', ["lbServices"])

  .config(["LoopBackResourceProvider", function (LoopBackResourceProvider) {
    LoopBackResourceProvider.setUrlBase("http://127.0.0.1:3000/api");
  }])

  .controller('controller', ['$scope', function ($scope) {
    $scope.value = 42;
  }]);
