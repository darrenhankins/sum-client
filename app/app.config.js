(function(){
  'use strict';

  angular
    .module('sumApp')
    .config(config);

    function config($stateProvider, $urlRouterProvider, $locationProvider){

      $locationProvider.html5Mode(true);

      $stateProvider
      .state({
        name: 'login',
        component: 'login',
        url: '/'
      })
      .state({
        name: 'signup',
        component: 'signup',
        url: '/signup'
      })
      .state({
        name: 'profile',
        component: 'profile',
        url: '/profile'
      })
      .state({
        name: 'items',
        component: 'items',
        url: '/profile/items'
      })
      .state({
        name: 'groups',
        component: 'groups',
        url: '/profile/groups'
      })
      .state({
        name: 'friends',
        component: 'friends',
        url: '/profile/friends'
      });

      $urlRouterProvider.otherwise('/');
    }

})();
