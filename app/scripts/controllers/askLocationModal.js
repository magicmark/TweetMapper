'use strict';

/**
 * @ngdoc function
 * @name tweetMapper.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tweetMapper
 */
angular.module('tweetMapper')

.controller('AskLocationModalCtrl',
  [ '$scope', '$modalInstance', 'randomPlace',
  function ($scope, $modalInstance, randomPlace) {

    // Initialise the random place
    $scope.randomPlace = randomPlace;

    /**
     * Handle the button click - close modal and send ocation to parent controller
     * 
     * @return {undefined}
     */
    $scope.findTweetsClicked = function () {
      $modalInstance.close($scope.location || '');
    };

    /**
     * Dismiss the modal without action
     * 
     * @return {undefined}
     */
    $scope.dismissModal = function () {
      $modalInstance.dismiss();
    };

  }

]);
