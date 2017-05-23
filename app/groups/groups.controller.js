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
          vm.data = {};
          vm.data.name = '';

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
              console.log("Reset Form");
              vm.data.name = '';
              $scope.addGroupForm.$setPristine();
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
              console.log("Checkbox ID:", id-1);
              // vm.groups[0].friends[id-1].checked = false;
              // console.log("Checked:", vm.groups[0].friends[id-1].checked);
            }

            //  vm.groupEdit = [];
            //  vm.editGroupInfo = function (id) {
            //    console.log("Group Edit ID:", id);
            //    if (vm.groupEdit[id] == false || !vm.groupEdit[id]){
            //      vm.displayGroupInfo(id);
            //      vm.groupEdit[id] = true;
            //    } else {
            //      console.log(vm.groupEdit[id]);
            //      vm.groupEdit[id]= false;
            //    }
            //  }

             vm.groupEdit = [];
             vm.editGroupInfo = function(id) {
                 if (vm.groupEdit[id] == false || !vm.groupEdit[id]) {
                     console.log("Group Edit ID:",  id);
                     vm.groupEdit[id] = true;
                     vm.groupEditing = true;
                 } else {
                     //  vm.resetForm2();
                     console.log("Group Edit ID:",  id);
                     vm.groupEdit[id] = false;
                     vm.groupEditing = false;
                 }
             }

             vm.editGroup = function () {
               if (vm.groupEditDropdown == false || !vm.groupEditDropdown ){
                 vm.groupEditDropdown = true;
               } else {
                 vm.resetForm();
                 vm.groupEditDropdown= false;
               }
             }


            vm.displayGroupInfo = function(id) {
              vm.groupId = id;
              console.log("Group ID:", vm.groupId);
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

                   vm.friends = response.data[1];
                  //  vm.oneFriends = response.data[1][1].name;
                  console.log("All Friends, Total Number:", vm.friends.length);
                   console.log("All Friends:", vm.friends);

                  //  vm.allGroups = response.data[0];
                  //  console.log("All Groups:", vm.allGroups);
                   //
                  //  vm.groupName = response.data[0][1].name;
                  //  console.log("Group Name:", vm.groupName);

                   vm.friendsInGroup = response.data[0][0].friend;
                   console.log("Friends In Group 0, Total Number:", vm.friendsInGroup.length);
                   console.log("Friends In Group 0:", vm.friendsInGroup);
                   // console.log("currentFriendsInGroup", vm.currentFriendsInGroup[1].friend[0]);

                   vm.tempGroup1 = [{
                     "friend0": [{
                       "id": 1,
                       "name": "Darren",
                       "checked": false
                     }],
                     "friend1": [{
                       "id": 2,
                       "name": "Paul",
                       "checked": true
                     }],
                     "friend2": [{
                       "id": 3,
                       "name": "Jesse",
                       "checked": true
                     }]
                   }];

                  //  vm.groups = [{
                  //    "id": 1,
                  //    "name": "Family",
                  //    "friends": [{
                  //        "id": 1,
                  //        "name": "Jim",
                  //        "checked": true
                  //    }]
                  //  }];

               });
             }

             vm.newGroup = function() {
               vm.data.user_id = $stateParams.user_id;
               console.log("New Group:", vm.data);
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
               console.log("Group Update Index: ", index);
               // name didn't change
               if (!vm.groupTemp.name) {
                 vm.groupTemp.name = vm.groups[index].name;
               }
               var id = vm.groups[index].id;
               vm.groupEdit[id] = false;
               vm.groupEditDropdown = false;
               vm.groupEditing = false;
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
                 vm.resetForm();
                 vm.groupEditing = false;
                 vm.groupEditDropdown = false;
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
