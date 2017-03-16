(function(){
  'use strict';

  angular
    .module('sumApp')
    .controller('FriendsController', FriendsController);

    function FriendsController() {
      console.log('This is the FriendsController...');
      const vm = this;

      vm.$onInit = function(){
        vm.friends = [{
          "id": 1,
          "name": "Paul Kowalkski",
          "email": "paul@gmail.com"
        },
        {
          "id": 2,
          "name": "Jeff",
          "email": "jeff@gmail.com"
        },
        {
          "id": 3,
          "name": "Jim",
          "email": "jim@gmail.com"
        },
        {
          "id": 4,
          "name": "George",
          "email": "george@gmail.com"
        }
      ]

      };
    }

})();
