(function() {
    'use strict';

    const API_URL = getHostUrl();

    angular
        .module('sumApp')
        .controller('ItemsController', ItemsController);

    function ItemsController($scope, $http, $location, $stateParams) {
        console.log("This is the ItemsController...");
        const vm = this;

        // $scope.complete = function(content) {
        //   console.log(content); // process content
        // }
        console.log($stateParams.id);
        console.log($stateParams.dog);
        vm.user_id = $stateParams.id;


        vm.$onInit = function() {

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
            //     },
            //     {
            //         "id": 2,
            //         "user_id": 1,
            //         "name": "Dresser",
            //         "description": "5 drawer, white dresser",
            //         "image_url": "http://www.newportcottages.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/r/i/ricki-4-drawer-dresser.jpg",
            //         "free": true,
            //         "available": false,
            //         "emailed": true,
            //         "uuid": "7a955f98-2619-40c7-95c9-1a64a3e06742"
            //     },
            //     {
            //         "id": 3,
            //         "user_id": 1,
            //         "name": "Jeep",
            //         "description": "2017 White Jeep, 4x4",
            //         "image_url": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTALN3NE0eFvdouxBaoKExsJAbpVhBLp7QIgWW3h2c1Kb1YqUHk8LbZU4mZ",
            //         "free": false,
            //         "available": true,
            //         "emailed": true,
            //         "uuid": "7a955f98-2619-40c7-95c9-1a64a3e06742"
            //     },
            //     {
            //         "id": 4,
            //         "user_id": 1,
            //         "name": "Football Party",
            //         "description": "Super Bowl Game shirt",
            //         "image_url": "http://i1.ebayimg.com/thumbs/images/g/IO8AAMXQUmFSn9j6/s-l225.jpg",
            //         "free": true,
            //         "available": true,
            //         "emailed": false,
            //         "uuid": "7a955f98-2619-40c7-95c9-1a64a3e06742"
            //     },
            //     {
            //         "id": 5,
            //         "user_id": 1,
            //         "name": "Jeep",
            //         "description": "1985 Green Jeep, 4x4",
            //         "image_url": "http://images.indexusedcars.com/Jeep/CJ7/1985/0b1f8cfc-d681-4ce6-ad0d-3ce5069bfd36/Jeep_CJ7_1985.jpeg",
            //         "free": false,
            //         "available": true,
            //         "emailed": true,
            //         "uuid": "7a955f98-2619-40c7-95c9-1a64a3e06742"
            //     },
            //     {
            //         "id": 6,
            //         "user_id": 1,
            //         "name": "Jeep",
            //         "description": "2015 Red Jeep, 4x4",
            //         "image_url": "http://www.jeep.com/content/dam/fca-brands/na/jeep/en_us/global/header/Vehicles/Standard-Models/2017-Jeep-GlobalNav-VehicleCard-Standard-Wrangler.jpg.image.300.jpg",
            //         "free": false,
            //         "available": true,
            //         "emailed": false,
            //         "uuid": "7a955f98-2619-40c7-95c9-1a64a3e06742"
            //     }
            // ];
        }

        // get all item
        $http.get(`${API_URL}/user/${vm.user_id}/items`)
        .then(function (response) {
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


        vm.sendEmail = function (item_id){
          //  '/:id/items/:item_id/sendemail'
          console.log("Send Email = "+item_id);
          var user_id = 1;
          $http.get(`${API_URL}/user/${vm.user_id}/items/${item_id}/sendemail`)
          .then(function (response) {
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

        vm.updateItem = function (id){
          console.log("Update Item");
        }

        vm.itemEdit = [];
         vm.editItemInfo = function (id){
           if (vm.itemEdit[id] == false || !vm.itemEdit[id]){
             console.log(vm.itemEdit[id]);
             vm.itemEdit[id] = true;
           } else {
             console.log(vm.itemEdit[id]);
             vm.itemEdit[id] = false;
           }
         }

         vm.setItemId = function (id){
           console.log(id);
           vm.itemId = id;
         }

         vm.setItemEditId = function (id) {
           console.log(id);
           vm.itemEditId = id;
         }
        // https://sum-app.herokuapp.com/user/1/items
    }

    function getHostUrl() {
        if (window.location.host.indexOf('localhost') != -1) {
            return 'http://localhost:3000';
        } else {
          return 'https://sum-app.herokuapp.com';
        }
    }

})();
