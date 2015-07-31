'use strict';

/**
 * @ngdoc overview
 * @name tweetMapper
 * @description
 * # tweetMapper
 *
 * Main module of the application.
 */
angular
  .module('tweetMapper', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'openlayers-directive'
  ])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  });
