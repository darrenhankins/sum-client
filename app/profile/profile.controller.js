(function(){
  'use strict';

  angular
    .module('sumApp')
    .controller('ProfileController', ProfileController);

    function ProfileController(){
      console.log("This is the ProfileController...");
    }

})();
