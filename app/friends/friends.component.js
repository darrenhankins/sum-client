(function(){
  'use strict';

  angular
    .module('sumApp')
    .component('friends', {
      controller: 'FriendsController',
      templateUrl: 'app/friends/friends.html'
    });

})();
