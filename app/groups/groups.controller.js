(function() {
    'use strict';

    const API_URL = getHostUrl();

    angular
        .module('sumApp')
        .controller('GroupsController', GroupsController);

    function GroupsController($scope, $http, $stateParams, $state, $location) {
        console.log("This is the GroupsController...");
        const vm = this;

        vm.$onInit = function() {
          if ($stateParams.user_id == null){
            $location.url('/login');
          } else {
            vm.user_id = $stateParams.user_id;
            vm.getGroups();
          }
            // vm.groups = [{
            //         "id": 1,
            //         "name": "Family",
            //         "friends": [{
            //             "id": 1,
            //             "name": "Jim",
            //             "checked": true
            //         }]
            //     }
            // }];
        };

        if ($stateParams.user_id == null) {
            $location.url('/login');
        } else {
            vm.resetForm = function(){
              // vm.data.name = "";
            }

            // vm.temporyArrFn = function (){
            //
            //   // vm.temporyArray = vm.groups[0].friends;
            //   vm.temporyArray = vm.groups;
            //   console.log(vm.temporyArray);
            //   // let friends = vm.groups[0].friends;
            //   // console.log(friends);
            //   // for(let i=0;i<friends.length; i++) {
            //   //   if (friends[i].checked) {
            //   //     vm.temporyArray.push(friends[i].id);
            //   //     console.log(vm.temporyArray);
            //   //   }
            //   // }
            // }

            vm.check = function (id) {
              // let id1 = id-1;
              console.log(id);
              vm.groups[0].friends[id-1].checked = true;
              // vm.toDatabase.push(id);
              console.log("CHECK");
              console.log(vm.groups[0].friends[id-1]);
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
            }

             vm.groupEdit = {};
             vm.editGroupInfo = function (id) {
               if (vm.groupEdit[id] == false || !vm.groupEdit[id]){
                 vm.displayGroupInfo(id);
                 vm.groupEdit[id] = true;
               } else {
                 console.log(vm.groupEdit[id]);
                 vm.groupEdit[id]= false;
               }
             }

            vm.displayGroupInfo = function(id) {
              console.log("Group ID:", id);
              var currentGroup = [];
              // currentFriendsInGroup
              // allFriendsOfUser
              // console.log("Total Friends of Users:", vm.allGroups.length);
              // console.log("Total Groups:", vm.currentFriendsInGroup.length);
              // console.log(vm.currentFriendsInGroup);
              // console.log("ID", vm.currentFriendsInGroup[0].id);
              // for (var i=0; i<vm.allFriendsOfUser.length; i++){
              //   if (vm.currentFriendsInGroup[i].id == vm.allFriendsOfUser[i].id) {
              //     console.log(vm.allFriendsOfUser[i].id, vm.currentFriendsInGroup[i].id);
              //   }
                // console.log("Name", vm.currentFriendsInGroup[i].name);
                // console.log("Email", vm.currentFriendsInGroup[i].email);
              // }
            }

            vm.names = [{
              "Darren": true,
              "Doug": false,
              "David": false,
              "Ken": false,
              "Jeff": true,
              "Robert": true
            }];

             vm.getGroups = function() {
               vm.groupTemp = {};
               $http.get(`${API_URL}/user/${$stateParams.user_id}/groups`)
               .then(function (response) {
                   vm.groups = response.data[0];

                   // sort function for groups
                   vm.groups.sort(function(s1, s2) {
                       var l = s1.name.toLowerCase(),
                           m = s2.name.toLowerCase();
                       return l === m ? 0 : l > m ? 1 : -1;
                   });

                   vm.allFriends = response.data[1];
                   console.log("All Friends", vm.allFriends);

                   vm.allGroups = response.data[0];
                   console.log("All Groups", vm.allGroups);

                   vm.groupName = response.data[0][0].name;
                   console.log("Group Name", vm.groupName);

                   vm.friendsInGroup0 = response.data[0][1].friend;
                   console.log("Friends In Group Index 1", vm.friendsInGroup0);
                   // console.log("currentFriendsInGroup", vm.currentFriendsInGroup[1].friend[0]);

               });
             }

             vm.editGroup = function (id) {
               if (vm.groupEditDropdown == false || !vm.groupEditDropdown ){
                 vm.groupEditDropdown = true;
               } else {
                 vm.groupEditDropdown= false;
                 vm.resetForm();
               }
             }

             vm.newGroup = function() {
               vm.data.user_id = $stateParams.user_id;
               console.log(vm.data);
               $http.post(`${API_URL}/user/${$stateParams.user_id}/groups`, vm.data)
               .then(function(data) {
                   console.log(data);
                   vm.groupEditDropdown = false;
                   vm.resetForm();
                   vm.getGroups();
               }, function() {
                   console.log('Group Failed!');
               });
               console.log('Group Created');
             }

             vm.updateGroup = function(index) {
               console.log(vm.names);
               console.log("group Index: "+index);
               // name didn't change
               if (!vm.groupTemp.name) {
                 vm.groupTemp.name = vm.groups[index].name;
               }
               console.log(vm.groupTemp);
               var id = vm.groups[index].id;
               $http.patch(`${API_URL}/user/${$stateParams.user_id}/groups/${id}`, vm.groupTemp)
                 .then(function(data) {
                     console.log(data);
                     vm.groupEdit[id] = false;
                     vm.groupEditDropdown = false;
                     vm.resetForm();
                     vm.getGroups();
                 }, function() {
                     console.log('Update Group Failed!');
                 });
                 console.log("Updated Group");
             }

             vm.deleteGroup = function(id) {
               $http.delete(`${API_URL}/user/${$stateParams.user_id}/groups/${id}`)
               .then(function(data) {
                 console.log(data);
                 vm.getGroups();
               }, function() {
                   console.log('Delete Group Failed!');
               });
               console.log("Deleted Group");
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
