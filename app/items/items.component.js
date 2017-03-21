(function(){
  'use strict';

  angular
    .module('sumApp')
    .component('items', {
      controller: 'ItemsController',
      templateUrl: 'app/items/items.html'
    })
})();
