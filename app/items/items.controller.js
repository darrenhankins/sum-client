(function() {
    'use strict';

    const API_URL = getHostUrl();

    angular
        .module('sumApp')
        .controller('ItemsController', ItemsController);

    function ItemsController($scope, $http, $location, $stateParams, $state) {
        console.log("This is the ItemsController...");
        const vm = this;

        vm.$onInit = function() {
            if ($stateParams.user_id == null) {
                $location.url('/login');
            } else {
              vm.user_id = $stateParams.user_id;
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
            // get all item
            $http.get(`${API_URL}/user/${$stateParams.user_id}/items`)
              .then(function(response) {
                  vm.items = response.data;
                  // console.log("Item "+vm.items[1].id+":", vm.items[1]);
                  console.log(response.data);
                  // $http.get('http://localhost:3000/user/1/groups')
                  // .then(function (response) {
                  //   vm.groups = response.data;
                  //   console.log(response.data);
                  // });
              });

            // get one item
            // $http.get('http://localhost:3000/user/1/items/1/')
            // .then(function (response) {
            //   vm.things = response.data;
            //   console.log(response.data);
            // });

            vm.sendEmail = function(item_id) {
                //  '/:id/items/:item_id/sendemail'
                console.log("Send Email = " + item_id);
                var user_id = 1;
                $http.get(`${API_URL}/user/${$stateParams.user_id}/items/${item_id}/sendemail`)
                    .then(function(response) {
                        // vm.items = response.data;
                        console.log(response.data);
                        $('#pleaseWaitDialog').modal('hide');
                        // $location.url('/profile/sendemail');

                        // $http.get('http://localhost:3000/user/1/groups')
                        // .then(function (response) {
                        //   vm.groups = response.data;
                        //   console.log(response.data);
                        // });
                    });
            }

            vm.updateItem = function(id) {
              console.log("Update Item:", id);
            }

            vm.deleteItem = function(id) {
              console.log("Deleted Item:", id);
            }

            vm.itemEdit = [];
            vm.editItemInfo = function(id) {
                if (vm.itemEdit[id] == false || !vm.itemEdit[id]) {
                    console.log(vm.itemEdit[id]);
                    vm.itemEdit[id] = true;
                } else {
                    console.log(vm.itemEdit[id]);
                    vm.itemEdit[id] = false;
                }
            }

            vm.setItemId = function(id) {
                console.log("Item ID:", id);
                vm.itemId = id;
            }

            vm.editItem = function(item_id) {
                console.log("Item Edit ID:", item_id);
                $state.go(`edit`, {
                  user_id: vm.user_id,
                  item_id: item_id
                });
            }
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
