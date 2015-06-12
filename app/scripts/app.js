'use strict';

/**
 * @ngdoc overview
 * @name hudlApp
 * @description
 * # hudlApp
 *
 * Main module of the application.
 */
angular
  .module('hudlApp', [
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
