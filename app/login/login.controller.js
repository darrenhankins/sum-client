(function(){
  'use strict';

  angular
    .module('sumApp')
    .controller('LoginController', LoginController);

    function LoginController($scope, $http) {
      console.log('Login controller....');
    }

})();
