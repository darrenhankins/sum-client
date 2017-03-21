(function(){
  'use strict';

  angular
    .module('sumApp')
    .controller('ClaimController', ClaimController);

  function ClaimController($scope, $stateParams){
    console.log("This is the ClaimController...");
    const vm = this;

    // '/claim/item/:item_id/friend/:friend_id/uuid/:uuid'
    console.log($stateParams);


  }

})();
