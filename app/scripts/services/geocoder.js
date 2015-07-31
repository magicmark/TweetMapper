'use strict';

/**
 * @ngdoc service
 * @name tweetMapper.geocoder
 * @description
 * # geocoder
 * Service in the tweetMapper.
 */
angular.module('tweetMapper')

.service('geocoder',
  [ '$q', '$http',
  function ($q, $http) {

    var baseUrl = 'https://api.opencagedata.com/geocode/v1/', 
        apiKey  = 'KEYHERE';
        
    /**
     * Get the API endpoint for a specified location
     * 
     * @param  {String} - location
     * @return {String} - the API Url
     */
    function getAPIEndpoint (_location_) {
      return baseUrl + 'json?q=' + encodeURI(_location_) + '&key=' + apiKey;
    }

    /**
     * Take an array of results, and return the best one based on the API's
     * confidence ranking that it's the best one. Needed because the API result
     * is sometimes unsorted.
     * 
     * @param  {Array} - array of result objects
     * @return {Object|null} - the best result
     */
    function getBestResult (_results_) {

      if (!_results_.length) {
        return null;
      }
      
      /*
      _results_.sort(function (a, b) {
        return b.confidence - a.confidence;
      });
      */
     
      return _results_[0];

    }

    return {
      /**
       * Turn a location string (landmark, city name etc into a set of coordinates)
       * 
       * @param  {String} - the location
       * @return Promsise - the coordinates
       */
      getCoordinates: function (_location_) {

        // The defered object
        var deferred = $q.defer();

        // Make the API Request
        $http.get(getAPIEndpoint(_location_))
        .success(function (data, status, headers, config) {

          var result = getBestResult(data.results);

          // Return the first (best) object, as long as it is safe to do so
          if (result) {
            deferred.resolve({
              'coordinates' : result.geometry,
              'location'    : result.formatted
            });
          } else {
            deferred.reject();
          }

        })
        .error(function (data, status, headers, config) {
          deferred.reject();
        });

        return deferred.promise;

      }
    };

  }

]);
