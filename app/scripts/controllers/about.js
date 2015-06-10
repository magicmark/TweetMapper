'use strict';

/**
 * @ngdoc function
 * @name hudlApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the hudlApp
 */
angular.module('hudlApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
