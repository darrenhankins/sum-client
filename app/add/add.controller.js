(function(){
  'use strict';

  const API_URL = getHostUrl();

  angular
    .module('sumApp')
    .controller('AddController', AddController);

    function AddController($scope, $http, $location, $stateParams, $state) {
      console.log('This is the AddController...');
      const vm = this;

      console.log("USER_ID= "+$stateParams.user_id);

      vm.user_id = $stateParams.user_id;

      vm.$onInit = function() {
        // vm.data = [];
        //
        // vm.data.image_url = 'http://images.evo.com/imgp/700/105373/472194/intense-cycles-tracer-275a-foundation-complete-mountain-bike-2016-red.jpg';
        // vm.groups = [{
        //         "id": 1,
        //         "name": "Family",
        //         "checked": true
        //     },
        //     {
        //         "id": 2,
        //         "name": "Close Friends",
        //         "checked": true
        //     },
        //     {
        //         "id": 3,
        //         "name": "Co-workers",
        //         "checked": false
        //     },
        //     {
        //         "id": 4,
        //         "name": "Broncos Fans",
        //         "checked": true
        //     }
        // ];
          // vm.data.push(vm.groups);
          // console.log(vm.data);

      }

      vm.newItem = function() {
          vm.data.user_id = vm.user_id;
          console.log(vm.data);
          $http.post(`${API_URL}/user/${vm.user_id}/items`, vm.data)
          .then(function(data) {
            console.log(data);

            $state.go(`items`, {
                user_id: vm.user_id
            });

            // $location.url(`/profile/${vm.user_id}/items`);
          }, function() {
            console.log('NewItem Failed!');
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
