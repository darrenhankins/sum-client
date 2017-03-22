(function(){
  'use strict';

  angular
    .module('sumApp')
    .controller('SignupController', SignupController);

    function SignupController($scope, $http) {
      console.log('Signup controller....');
    }

})();
