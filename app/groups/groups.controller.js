(function() {
  'use strict';

  angular
    .module('sumApp')
    .controller('GroupsController', GroupsController);

    function GroupsController() {
      console.log("This is the GroupsController...");
    }

})();
