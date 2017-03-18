(function() {
    'use strict';

    angular
        .module('sumApp')
        .controller('ItemsController', ItemsController);

    function ItemsController() {
        console.log("This is the ItemsController...");
        const vm = this;

        vm.$onInit = function() {

            vm.items = [{
                    "id": 1,
                    "user_id": 1,
                    "name": "Rockies Tickets",
                    "description": "2 Tickets to Opening Day",
                    "image_url": "http://hlsb.com/Images/Rockies/tickets.png",
                    "free": false,
                    "available": true,
                    "emailed": false,
                    "uuid": "7a955f98-2619-40c7-95c9-1a64a3e06742"
                },
                {
                    "id": 2,
                    "user_id": 1,
                    "name": "Dresser",
                    "description": "5 drawer, white dresser",
                    "image_url": "http://www.newportcottages.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/r/i/ricki-4-drawer-dresser.jpg",
                    "free": true,
                    "available": false,
                    "emailed": true,
                    "uuid": "7a955f98-2619-40c7-95c9-1a64a3e06742"
                },
                {
                    "id": 3,
                    "user_id": 1,
                    "name": "Jeep",
                    "description": "2017 White Jeep, 4x4",
                    "image_url": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTALN3NE0eFvdouxBaoKExsJAbpVhBLp7QIgWW3h2c1Kb1YqUHk8LbZU4mZ",
                    "free": false,
                    "available": true,
                    "emailed": true,
                    "uuid": "7a955f98-2619-40c7-95c9-1a64a3e06742"
                },
                {
                    "id": 4,
                    "user_id": 1,
                    "name": "Football Party",
                    "description": "Super Bowl Game shirt",
                    "image_url": "http://i1.ebayimg.com/thumbs/images/g/IO8AAMXQUmFSn9j6/s-l225.jpg",
                    "free": true,
                    "available": true,
                    "emailed": false,
                    "uuid": "7a955f98-2619-40c7-95c9-1a64a3e06742"
                },
                {
                    "id": 5,
                    "user_id": 1,
                    "name": "Jeep",
                    "description": "1985 Green Jeep, 4x4",
                    "image_url": "http://images.indexusedcars.com/Jeep/CJ7/1985/0b1f8cfc-d681-4ce6-ad0d-3ce5069bfd36/Jeep_CJ7_1985.jpeg",
                    "free": false,
                    "available": true,
                    "emailed": true,
                    "uuid": "7a955f98-2619-40c7-95c9-1a64a3e06742"
                },
                {
                    "id": 6,
                    "user_id": 1,
                    "name": "Jeep",
                    "description": "2015 Red Jeep, 4x4",
                    "image_url": "http://www.jeep.com/content/dam/fca-brands/na/jeep/en_us/global/header/Vehicles/Standard-Models/2017-Jeep-GlobalNav-VehicleCard-Standard-Wrangler.jpg.image.300.jpg",
                    "free": false,
                    "available": true,
                    "emailed": false,
                    "uuid": "7a955f98-2619-40c7-95c9-1a64a3e06742"
                }
            ];
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
        // https://sum-app.herokuapp.com/user/1/items
    }

})();
