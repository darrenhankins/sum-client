(function() {
    'use strict';

    angular
        .module('sumApp')
        .controller('GroupsController', GroupsController);

    function GroupsController($scope, $http) {
        console.log("This is the GroupsController...");
        const vm = this;

        vm.$onInit = function() {
            vm.groups = [{
                    "id": 1,
                    "name": "Family",
                    "friends": [{
                      "id": 1,
                      "name": "Jim",
                      "checked": true
                      },{
                      "id": 2,
                      "name": "Tom",
                      "checked": true
                      },{
                      "id": 3,
                      "name": "Paul",
                      "checked": true
                      },{
                      "id": 4,
                      "name": "Rob",
                      "checked": false
                      },{
                      "id": 5,
                      "name": "Ben",
                      "checked": false
                      },{
                      "id": 6,
                      "name": "Fred",
                      "checked": false
                      },{
                      "id": 7,
                      "name": "Jeff",
                      "checked": false
                      }]
                },
                {
                    "id": 2,
                    "name": "Close Friends",
                    "friends": [{
                      "id": 1,
                      "name": "Jim",
                      "checked": false
                      },{
                      "id": 2,
                      "name": "Tom",
                      "checked": false
                      },{
                      "id": 3,
                      "name": "Paul",
                      "checked": false
                      },{
                      "id": 4,
                      "name": "Rob",
                      "checked": true
                      },{
                      "id": 5,
                      "name": "Ben",
                      "checked": true
                      },{
                      "id": 6,
                      "name": "Fred",
                      "checked": false
                      },{
                      "id": 7,
                      "name": "Jeff",
                      "checked": false
                      }]
                },
                {
                    "id": 3,
                    "name": "Co-workers",
                    "friends": [{
                      "id": 1,
                      "name": "Jim",
                      "checked": false
                      },{
                      "id": 2,
                      "name": "Tom",
                      "checked": false
                      },{
                      "id": 3,
                      "name": "Paul",
                      "checked": true
                      },{
                      "id": 4,
                      "name": "Rob",
                      "checked": false
                      },{
                      "id": 5,
                      "name": "Ben",
                      "checked": false
                      },{
                      "id": 6,
                      "name": "Fred",
                      "checked": false
                      },{
                      "id": 7,
                      "name": "Jeff",
                      "checked": true
                      }]

                },
                {
                    "id": 4,
                    "name": "Broncos Fans",
                    "friends": [{
                      "id": 1,
                      "name": "Jim",
                      "checked": true
                      },{
                      "id": 2,
                      "name": "Tom",
                      "checked": true
                      },{
                      "id": 3,
                      "name": "Paul",
                      "checked": true
                      },{
                      "id": 4,
                      "name": "Rob",
                      "checked": false
                      },{
                      "id": 5,
                      "name": "Ben",
                      "checked": true
                      },{
                      "id": 6,
                      "name": "Fred",
                      "checked": true
                      },{
                      "id": 7,
                      "name": "Jeff",
                      "checked": false
                      }]
                }
            ];
            vm.temporyArrFn();
        };

        vm.temporyArrFn = function (){

          // vm.temporyArray = vm.groups[0].friends;
          vm.temporyArray = vm.groups;
          console.log(vm.temporyArray);
          // let friends = vm.groups[0].friends;
          // console.log(friends);
          // for(let i=0;i<friends.length; i++) {
          //   if (friends[i].checked) {
          //     vm.temporyArray.push(friends[i].id);
          //     console.log(vm.temporyArray);
          //   }
          // }
        }

        vm.check = function (id) {
          // let id1 = id-1;
          console.log(id);
          vm.groups[0].friends[id-1].checked = true;
          // vm.toDatabase.push(id);
          console.log("CHECK");
          console.log(vm.groups[0].friends[id-1]);
          // console.log(vm.toDatabase);
        }
        vm.unCheck = function (id) {
          // for (let i=0; i<vm.toDatabase.length; i++) {
          //   if (id == vm.toDatabase[i]) {
          //     vm.toDatabase.splice(i, 1);
          //   }
          // }
          // let id1 = id-1;
          console.log(id);

          vm.groups[0].friends[id-1].checked = false;
          console.log("unCHECK");
          console.log(vm.groups[0].friends[id-1]);
          // console.log(vm.toDatabase);
        }



        // vm.showDropdown = function () {
        //   if (!vm.showDropdownVal) {
        //     vm.groups = vm.temporyArray;
        //     console.log(vm.groups);
        //     console.log(vm.temporyArray);
        //     vm.showDropdownVal = true;
        //     console.log("test");
        //   } else {
        //     vm.showDropdownVal = false;
        //   }
        // }


        vm.groupEdit = [];
         vm.editGroupInfo = function (id){
           if (vm.groupEdit[id] == false || !vm.groupEdit[id]){
             console.log(vm.groupEdit[id]);
             vm.groupEdit[id] = true;
           } else {
             console.log(vm.groupEdit[id]);
             vm.groupEdit[id]= false;
           }
         }

         vm.editGroup = function (){
           if (vm.groupEditDropdown == false || !vm.groupEditDropdown ){
             vm.groupEditDropdown = true;
           } else {
             vm.groupEditDropdown= false;
           }
         }


    }

})();
