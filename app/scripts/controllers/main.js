'use strict';

/**
 * @ngdoc function
 * @name hudlApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hudlApp
 */
angular.module('hudlApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
