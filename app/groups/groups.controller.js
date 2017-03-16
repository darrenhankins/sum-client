(function() {
    'use strict';

    angular
        .module('sumApp')
        .controller('GroupsController', GroupsController);

    function GroupsController() {
        console.log("This is the GroupsController...");
        const vm = this;

        vm.$onInit = function() {
            vm.groups = [{
                    "id": 1,
                    "name": "Family"
                },
                {
                    "id": 2,
                    "name": "Close Friends"
                },
                {
                    "id": 3,
                    "name": "Co-workers"
                },
                {
                    "id": 4,
                    "name": "Broncos Fans"
                }
            ];
        };
    }

})();
