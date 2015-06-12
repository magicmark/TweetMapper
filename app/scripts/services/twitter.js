'use strict';

/**
 * @ngdoc service
 * @name hudlApp.twitter
 * @description
 * # twitter
 * Service in the hudlApp.
 */
angular.module('hudlApp')
.service('twitter',
  [ '$q', '$http',
  function ($q, $http) {




    var baseUrl     = 'https://api.twitter.com/1.1/search/tweets.json', 
        accessToken = 'AAAAAAAAAAAAAAAAAAAAAAGJgAAAAAAAzq%2FIAvzm%2BoAaGBsJgl3Uu%2BAW4yE%3D2FXU1BPN2qcNEEN3sMugKr1o2OsmCJVpPOFnwecp2dobNqIxHa';

    // $http.defaults.headers.common.Authorization = 'Basic ' + accessToken;
    // $httpProvider.defaults.withCredentials = true;
delete $http.defaults.headers.common['X-Requested-With'];
    $http.defaults.useXDomain = true;


    /**
     * Get the twitter API endpoint for the specified location
     * 
     * @param  {String} - location
     * @return {String} - the API Url
     */
    function getAPIEndpoint (_geocode_) {
      var geocodeString = _geocode_.lat + ',' + _geocode_.lng + ';1km';
      return baseUrl + '?q=&geocode=' + encodeURI(geocodeString) + '&result_type=recent';
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
        $http({
          method: 'GET',
          url: getAPIEndpoint(_geocode_),
          headers: {
           'Authorization': 'Bearer ' + accessToken
          }
        })
        .success(function (data, status, headers, config) {
          console.log("got data - " + data);
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
