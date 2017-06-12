(function() {
    'use strict';

    const API_URL = getHostUrl();

    angular
        .module('sumApp')
        .controller('EditController', EditController);

    function EditController($scope, $http, $location, $stateParams, $state) {
        console.log("This is the EditController...");
        const vm = this;

        vm.$onInit = function() {
            if ($stateParams.user_id == null) {
                $location.url('/login');
            } else {
              vm.user_id = $stateParams.user_id;
              vm.item_id = $stateParams.item_id;
            }
            // vm.groups = [{
            //         "id": 1,
            //         "name": "Family",
            //         "checked": true
            //     }
            // ];
            // vm.items = [{
            //         "id": 1,
            //         "user_id": 1,
            //         "name": "Rockies Tickets",
            //         "description": "2 Tickets to Opening Day",
            //         "image_url": "http://hlsb.com/Images/Rockies/tickets.png",
            //         "free": false,
            //         "available": true,
            //         "emailed": false,
            //         "uuid": "7a955f98-2619-40c7-95c9-1a64a3e06742"
            //     }
            // ];
        }

        if ($stateParams.user_id == null) {
            $location.url('/login');
        } else {
            // get item
            $http.get(`${API_URL}/user/${$stateParams.user_id}/items/${$stateParams.item_id}`)
              .then(function(response) {
                  vm.item = response.data;
                  vm.groups = vm.item.group
                  console.log(vm.groups);
              });

            vm.updateItem = function(item_id) {
              console.log("Update Item:", item_id);
              $http.patch(`${API_URL}/user/${$stateParams.user_id}/items/${item_id}`, vm.item)
                .then(function(data) {
                  console.log(data);
                  $state.go(`items`, {
                    user_id: $stateParams.user_id
                  });
                }, function() {
                  console.log('UpdatedItem');
                });
            }

            vm.deleteItem = function(id) {
              $http.delete(`${API_URL}/user/${$stateParams.user_id}/items/${id}`)
                  .then(function(data) {
                      console.log(data);
                      $state.go(`items`, {
                        user_id: $stateParams.user_id
                      });
                  }, function() {
                      console.log('Delete Group Failed!');
                  });
              console.log("Deleted Item:", id);
            }

            vm.cancelEdit = function() {
              $state.go(`items`, {
                user_id: vm.user_id
              });
            }

            // vm.itemEdit = [];
            // vm.editItemInfo = function(id) {
            //     if (vm.itemEdit[id] == false || !vm.itemEdit[id]) {
            //         console.log(vm.itemEdit[id]);
            //         vm.itemEdit[id] = true;
            //     } else {
            //         console.log(vm.itemEdit[id]);
            //         vm.itemEdit[id] = false;
            //     }
            // }
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
