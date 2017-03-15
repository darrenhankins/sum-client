(function(){
  'use strict';

  angular
    .module('sumApp')
    .controller('ItemsController', ItemsController);

    function ItemsController() {
      console.log("This is the ItemsController...");
    }

})();
