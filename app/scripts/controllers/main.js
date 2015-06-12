'use strict';

/**
 * @ngdoc function
 * @name hudlApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hudlApp
 */
angular.module('hudlApp')

.controller('MainCtrl',
  [ '$scope', '$modal', '$window', 'geocoder', 'twitter',
  function ($scope, $modal, $window, geocoder, twitter) {

    var randomPlaces;

    /**
     * A list of places to be potentially shown to users
     */
    randomPlaces = [
      'Manchester, UK',
      'Eiffel Tower',
      'Lincoln, Nebraska',
      'Kennedy Space Center',
      'Central Park Zoo'
    ];

    /**
     * A hack because angular ui modal (http://angular-ui.github.io/bootstrap/)
     * doesn't actually work properly. Removes the boostrap backdrops.
     * 
     * @return {undefined}
     */
    function hideModalBackdrop () {
      angular.element('body').removeClass('modal-open');
      angular.element('.modal.fade').remove();
    }

    /**
     * Generate a random place to be shown in the form
     * 
     * @return {String}
     */
    function generateRandomPlace () {
      return randomPlaces[Math.floor(Math.random() * randomPlaces.length)];
    }

    /**
     * Turn the user entered location string into a set of coordinates
     * 
     * @param  {String} - the user entered location
     * @return {undefined}
     */
    function handleLocation (_location_) {
      
      // Basic validation
      if (!_location_ || _location_.trim() === '') {
        $window.alert('Please enter a valid place name!');
        return ;
      }

      // Turn a place name into some coordinates (long, lat)
      geocoder.getCoordinates(_location_)
      .then(function (place) {

        // Update message
        $scope.message = "Finding tweets for " + place.location;
        // Find the tweets
        findTweets(place.coordinates);

      }, function () {
        $window.alert('Oh dear - there was an error finding the location! Please try again.');
      });

    }

    /**
     * Find tweets for specified coordinates
     * 
     * @param  {Object} - coordinates
     * @return {[type]}
     */
    function findTweets (_coordinates_) {
      twitter.findTweets(_coordinates_).then(function (results) {
        console.log(results);
      });
    }

    /**
     * The initial place to be shown on the map
     */
    $scope.mapCenter = {
      lat: 53.4667,
      lon: -2.2333,
      zoom: 6
    };

    /**
     * The paramaters for the openLayers view
     */
    $scope.mapDefaults = {
      loadTilesWhileAnimating: true,
      interactions: {
        mouseWheelZoom: true
      },
      controls: {
        zoom: false,
        rotate: false,
        attribution: false
      }
    };

    $scope.message = "To get started, click the button on the right!";

    /**
     * Shows the modal window asking for a location
     * 
     * @return {undefined}
     */
    $scope.showLocationModal = function () {

      // Start the modal instance
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'views/locationModal.html',
        controller: 'AskLocationModalCtrl',
        backdrop: false,
        size: 'lg',
        resolve: {
          randomPlace: function () {
            return generateRandomPlace();
          }
        }
      });

      // On modal completion, handle the location passed back to us
      modalInstance.result.then(function (location) {
        $scope.message = "Finding location...";
        hideModalBackdrop();
        handleLocation(location);
      }, function () {
        hideModalBackdrop();
      });
    };

  }

]);