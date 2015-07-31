'use strict';

/**
 * @ngdoc function
 * @name tweetMapper.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tweetMapper
 */
angular.module('tweetMapper')

.controller('MainCtrl',
  [ '$scope', '$modal', '$window', 'geocoder', 'twitter', '$timeout', '$document',
  function ($scope, $modal, $window, geocoder, twitter, $timeout, $document) {

    var randomPlaces,
        currentPlace;

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

        // Save place
        currentPlace = place;

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

        // Update user
        $scope.message = "Located tweets!";

        // Filter out tweets with no geolocation
        var filteredTweets = results.statuses.filter(function (tweet) {
          return (tweet.geo && tweet.geo.type === 'Point')
        });

        displayTweets(filteredTweets);

      }, function () {
        $scope.message = "There was an error loading the tweets.";
      });
    }

    /**
     * Show the tweets on the map
     * 
     * @param  {Array} - array of tweets
     * @return {undefined}
     */
    function displayTweets (_tweets_) {

      // Clear tweets
      $scope.tweets = { };

      _tweets_.forEach(function (tweet) {

        var message = [
          '<div class="tweeter">',
          '  <h4>' + tweet.user.screen_name + '</h4>',
          '  <hr />',
          '  <p>' + tweet.text + '</p>',
          '</div>'
        ].join('\n');

        $scope.tweets['tweet' + tweet.id_str] = {
          lat: tweet.geo.coordinates[0],
          lon: tweet.geo.coordinates[1],
          label: {
            message: '<div class="tweetDiv' + tweet.id_str + '">' + message + '</div>',
            show: false,
            showOnMouseOver: true
          }
        };

        // TODO: Properly embed tweet using twitter API. Because of the dynamics
        // of how the library I'm using works, this is difficult.

        /*
        twttr.widgets.createTweet( 
          tweet.id_str,
          $window.document.getElementsByClassName('tweetDiv' + tweet.id_str)[0]
        ).then( function( el ) {
          console.log('Tweet added.');
          $scope.$apply();
        }).catch(function (err) {
          console.log(err);
        });
        */
       
        $scope.mapCenter = {
          lat: currentPlace.coordinates.lat,
          lon: currentPlace.coordinates.lng,
          zoom: 13
        };

        $scope.message = "Showing tweets around " + currentPlace.location;

      });
    

    }

    /**
     * Dictionary of tweets to be shown
     */
    $scope.tweets = { };

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