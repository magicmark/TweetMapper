'use strict';

/**
 * @ngdoc service
 * @name tweetMapper.twitter
 * @description
 * # twitter
 * Service in the tweetMapper.
 */
angular.module('tweetMapper')
.service('twitter',
  [ '$q', '$http',
  function ($q, $http) {

    var baseUrl  = 'https://example.com/tweets';

    /**
     * Get the twitter API endpoint for the specified location
     * 
     * @param  {String} - location
     * @return {String} - the API Url
     */
    function getAPIEndpoint (_geocode_) {
      var geocodeString = _geocode_.lat + ',' + _geocode_.lng + ',5km';
      return baseUrl + '/' + encodeURI(geocodeString);
    }

    return {
      /**
       * Get tweets for the specified coordinates
       * 
       * @param  {Object} - the geocode (coordinates)
       * @return Promise - the tweets
       */
      findTweets: function (_geocode_) {

        // The defered object
        var deferred = $q.defer();

        console.log(getAPIEndpoint(_geocode_));
        // Make the API Request
        $http.get(getAPIEndpoint(_geocode_))
        .success(function (data, status, headers, config) {
          deferred.resolve(data);
        })
        .error(function (data, status, headers, config) {
          console.log("error :( " , status);
          deferred.reject();
        });
        return deferred.promise;

      }
    };

  }

]);
