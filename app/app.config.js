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
        name: 'claim',
        component: 'claim',
        // url: '/claim'
        // 'http://localhost:3005/claim/item/1/friend/2/uuid/7a955f98-2619-40c7-95c9-1a64a3e06741'
        url: '/claim/item/:item_id/friend/:friend_id/uuid/:uuid'
      })
      .state({
        name: 'profile',
        component: 'profile',
        url: '/profile'
      })
      .state({
        name: 'items',
        component: 'items',
        // params: {
        //   dog: "Fred"
        // },
        url: '/profile/items'
      })
      .state({
        name: 'add',
        component: 'add',
        url: '/profile/add'
      })
      .state({
        name: 'sendemail',
        component: 'sendemail',
        url: '/profile/sendemail'
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
