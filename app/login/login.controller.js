(function() {
    'use strict';

    const API_URL = getHostUrl();

    angular
        .module('sumApp')
        .controller('LoginController', LoginController);

    function LoginController($scope, $http, $location) {
        console.log('Login controller....');
        const vm = this;

        vm.$onInit = function() {
          vm.loginFailed = false;
        }

        vm.resetForm = function() {
            // vm.data.$setPristine();
            // if (vm.loginForm) vm.loginForm.$setPristine();
            // vm.loginForm.email = null;
            // vm.loginForm.password = null;

            // vm.loginForm.setUntouched();
        }

        vm.login = function() {
            $http.post(`${API_URL}/token/login`, vm.loginForm)
                // .then(function(data) {
                //     $location.url('/profile/items');
                // }, function() {
                //     console.log("data", data);
                //     vm.resetForm();
                //     vm.login = false;
                //     console.log('login Failed!');
                // });
                .then(function(data) {
                  console.log(data);
                  let response = data.data.response;
                  switch(response.status) {
                    case 'success':
                      console.log(response.message);
                      console.log(response.token);
                      console.log(response.member);
                      vm.message = response.message;
                      vm.loginFailed = false;
                      $location.url(`/profile/${response.member.id}/items`);
                      break;
                    case 'failure 1':
                      vm.message = response.message;
                      vm.loginFailed = true;
                      vm.loginForm.email = null;
                      // vm.resetForm();
                      // loginForm.$pristine;
                      break;
                    case 'failure 2':
                      vm.message = response.message;
                      vm.loginFailed = true;
                      vm.loginForm.password = null;
                      // vm.resetForm();
                      // loginForm.$pristine;
                      break;

                  }
                    // $location.url('/profile/items');
                });
        }
    }

    function getHostUrl() {
        if (window.location.host.indexOf('localhost') != -1) {
            return 'http://localhost:3000';
        } else {
            return 'https://sum-app.herokuapp.com';
        }
    }

})();
