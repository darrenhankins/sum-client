(function() {
    'use strict';

    const API_URL = getHostUrl();

    angular
        .module('sumApp')
        .controller('FriendsController', FriendsController);

    function FriendsController($scope, $http, $location, $stateParams, $state) {
        console.log('This is the FriendsController...');
        const vm = this;

        vm.$onInit = function() {
            vm.data = {};
            vm.data.name = '';
            vm.data.email = '';
            vm.tempFriendData = {};


            if ($stateParams.user_id == null) {
                $location.url('/login');
            } else {
                vm.user_id = $stateParams.user_id;
                vm.getFriends();
            }
            //   vm.friends = [{
            //     "id": 1,
            //     "name": "Paul Kowalkski",
            //     "email": "paul@gmail.com"
            //   }
            // ];
        };


        if ($stateParams.user_id == null) {
            $location.url('/login');
        } else {
            vm.resetForm = function() {
                if (!$scope.addFriendForm.$pristine) {
                    vm.data.name = "";
                    vm.data.email = "";
                }
                vm.data.name = '';
                vm.data.email = '';
                $scope.addFriendForm.$setPristine(); //reset Form

                // vm.friend_edit[id].email = '';
                // $scope.updateFriendForm.$setPristine();
                // if (!$scope.updateFriendForm.$pristine) {
                //   vm.data.name = "";
                //   vm.data.email = "";
                // }
                // $scope.updateFriendForm.$setPristine();
            }


            vm.resetForm2 = function() {
                if (!$scope.updateFriendForm.$pristine) {
                    vm.data.name = "";
                    vm.data.email = "";
                }
                $scope.updateFriendForm.$setPristine();
            }

            vm.friendEdit = [];
            vm.editFriendInfo = function(id) {
                if (vm.friendEdit[id] == false || !vm.friendEdit[id]) {
                    console.log("Friend Edit ID:", vm.friendEdit[id]);
                    vm.friendEdit[id] = true;
                    vm.friendEditing = true;
                } else {
                    //  vm.resetForm2();
                    console.log("Friend Edit ID:", vm.friendEdit[id]);
                    vm.friendEdit[id] = false;
                    vm.friendEditing = false;
                    vm.setCheckedGroups(vm.allGroups);
                }
            }

            vm.editFriend = function() {
                if (vm.friendEditDropdown == false || !vm.friendEditDropdown) {
                    vm.friendEditDropdown = true;
                } else {
                    vm.resetForm();
                    vm.friendEditDropdown = false;
                }
            }

            vm.getFriends = function() {
                $http.get(`${API_URL}/user/${$stateParams.user_id}/friends`)
                    .then(function(response) {
                        // response.data[0]; // all friends
                        // response.data[1]; // all groups

                        // sort the groups
                        vm.allGroups = response.data[0];
                        vm.groups = response.data[1];
                        vm.groups.sort(function(s1, s2) {
                            var l = s1.name.toLowerCase(),
                                m = s2.name.toLowerCase();
                            return l === m ? 0 : l > m ? 1 : -1;
                        });
                        vm.setCheckedGroups(vm.allGroups);

                        //   // this creates an array of all the user's friends
                        //   // with an array  of all the users friends
                        //   // making them all initially unchecked in that group array
                        //   vm.friends = [];
                        //   for(let x=0; x<response.data[0].length; x++){ // friends
                        //     vm.friends[x] = {};
                        //     vm.friends[x]['name'] = response.data[0][x].name;
                        //     vm.friends[x]['email'] = response.data[0][x].email;
                        //     vm.friends[x]['id'] = response.data[0][x].id;
                        //     vm.friends[x]['user_id'] = response.data[0][x].user_id;
                        //     vm.friends[x].groups = [];
                        //     for(let v=0; v<vm.groups.length; v++){ // all friends
                        //       vm.friends[x].groups[v] = {};
                        //       vm.friends[x].groups[v].id = vm.groups[v].id;
                        //       vm.friends[x].groups[v].name = vm.groups[v].name;
                        //       vm.friends[x].groups[v].user_id = vm.groups[v].user_id;
                        //       vm.friends[x].groups[v].email = vm.groups[v].email;
                        //       vm.friends[x].groups[v].checked = false;
                        //    }
                        //   }
                        //
                        //   for(let x=0; x<response.data[0].length; x++){ // friends
                        //   // response.data[0][x].id
                        //     for(let v=0; v<response.data[0][x].group.length; v++){ // all groups
                        //     // response.data[0][x].friend[v].id
                        //       for(let y=0; y<vm.friends.length; y++){ // groups
                        //         if (vm.friends[y].id == response.data[0][x].id) {
                        //           for(let z=0; z<vm.friends[y].groups.length; z++){ // friends
                        //             if (vm.friends[y].groups[z].id == response.data[0][x].group[v].id) {
                        //                 vm.friends[y].groups[z].checked = true;
                        //             }
                        //          }
                        //         }
                        //       }
                        //     }
                        //   }
                        //  // sort friends in order
                        //   vm.friends.sort(function(s1, s2) {
                        //       var l = s1.name.toLowerCase(),
                        //           m = s2.name.toLowerCase();
                        //       return l === m ? 0 : l > m ? 1 : -1;
                        //   });
                    });
            }

            vm.setCheckedGroups = function(allGroups) {
                // this creates an array of all the user's friends
                // with an array  of all the users friends
                // making them all initially unchecked in that group array
                vm.friends = [];
                for (let x = 0; x < allGroups.length; x++) { // friends
                    vm.friends[x] = {};
                    vm.friends[x]['name'] = allGroups[x].name;
                    // vm.friends[x]['email'] = allGroups[x].email;
                    vm.friends[x]['id'] = allGroups[x].id;
                    vm.friends[x]['user_id'] = allGroups[x].user_id;
                    vm.friends[x].groups = [];
                    for (let v = 0; v < vm.groups.length; v++) { // all friends
                        vm.friends[x].groups[v] = {};
                        vm.friends[x].groups[v].id = vm.groups[v].id;
                        vm.friends[x].groups[v].name = vm.groups[v].name;
                        vm.friends[x].groups[v].user_id = vm.groups[v].user_id;
                        vm.friends[x].groups[v].email = vm.groups[v].email;
                        vm.friends[x].groups[v].checked = false;
                    }
                }

                for (let x = 0; x < allGroups.length; x++) { // friends
                    for (let v = 0; v < allGroups[x].group.length; v++) { // all groups
                        for (let y = 0; y < vm.friends.length; y++) { // groups
                            if (vm.friends[y].id == allGroups[x].id) {
                                for (let z = 0; z < vm.friends[y].groups.length; z++) { // friends
                                    if (vm.friends[y].groups[z].id == allGroups[x].group[v].id) {
                                        vm.friends[y].groups[z].checked = true;
                                    }
                                }
                            }
                        }
                    }
                }
                // sort friends in order
                vm.friends.sort(function(s1, s2) {
                    var l = s1.name.toLowerCase(),
                        m = s2.name.toLowerCase();
                    return l === m ? 0 : l > m ? 1 : -1;
                });
            }

            vm.groupChecked = function(friend_id, group_id) {
                console.log("FRIEND-GroupChecked: " + friend_id + "," + group_id);
                for (let x = 0; x < vm.friends.length; x++) {
                    if (vm.friends[x].id == friend_id) {
                        for (let y = 0; y < vm.friends[x].groups.length; y++) {
                            if (vm.friends[x].groups[y].id == group_id) {
                                if (vm.friends[x].groups[y].checked == false) {
                                    vm.friends[x].groups[y].checked = true;
                                    console.log("CHECKED !!!");
                                } else {
                                    vm.friends[x].groups[y].checked = false;
                                    console.log("UNCHECKED !!!");
                                }
                            }
                        }
                    }
                }
                console.log("Groups: => ", vm.friends);
            }

            // vm.groupChecked = function (friend_id, group_id){
            //   console.log("GROUP-FriendCHecked: "+group_id+","+friend_id);
            //   for(let x=0; x<vm.friends.length; x++) {
            //     if (vm.groups[x].id == group_id) {
            //       for(let y=0; y<vm.friends[x].groups.length; y++){
            //         if (vm.friends[x].groups[y].id == friend_id){
            //           if (vm.friends[x].groups[y].checked == false) {
            //             vm.friends[x].groups[y].checked = true;
            //             console.log("CHECKED !!!");
            //           } else {
            //             vm.friends[x].groups[y].checked = false;
            //             console.log("UNCHECKED !!!");
            //           }
            //         }
            //       }
            //     }
            //   }
            //   console.log("Groups: => ",vm.friends);
            // }

            vm.addFriend = function() {
                console.log("Add Friend");
                vm.data.user_id = $stateParams.user_id;
                console.log(vm.data);
                $http.post(`${API_URL}/user/${$stateParams.user_id}/friends`, vm.data)
                    .then(function(data) {
                        console.log(data);
                        vm.getFriends();
                        vm.friendEditDropdown = false;
                        vm.resetForm();
                    }, function() {
                        console.log('Add Friend Failed!');
                    });
                console.log("Added Friend");
            }


            vm.deleteFriend = function(id) {
                $http.delete(`${API_URL}/user/${$stateParams.user_id}/friends/${id}`)
                    .then(function(data) {
                        console.log(data);
                        vm.getFriends();
                        vm.resetForm();
                        vm.friendEditing = false;
                        vm.friendEditDropdown = false;
                    }, function() {
                        console.log('Delete Friend Failed!');
                    });
                console.log("Deleted Friend");
            }


            vm.updateFriend = function(friend_id) {
                console.log("Friend Update Index: ", friend_id);

                for (let x = 0; x < vm.friends.length; x++) {
                    if (vm.friends[x].id == friend_id) {
                        vm.tempFriendData = vm.friends[x];
                    }
                }

                console.log("THIS IS THE friendTemp !!!!", vm.friendTemp);
                console.log("THIS IS THE tempFriendData !!!!", vm.tempFriendData);

                vm.friendEdit[friend_id] = false;
                vm.friendEditDropdown = false;
                vm.friendEditing = false;
                // vm.friend_edit[friend_id].friend_id = friend_id;
                // console.log(vm.friend_edit[id]);
                // $http.patch(`${API_URL}/user/${$stateParams.user_id}/friends/${id}`, vm.friend_edit[id])
                $http.post(`${API_URL}/user/${$stateParams.user_id}/friends/${friend_id}`, vm.tempFriendData)
                    .then(function(data) {
                        console.log(data);
                        vm.freindEdit[friend_id] = false;
                        vm.friendEditDropdown = false;
                        vm.resetForm();
                        vm.getFriends();
                        console.log("Updated Friend");

                        // vm.getFriends();
                        // vm.resetForm(id);
                        // vm.friendEditDropdown = false;
                    }, function() {
                        console.log('Update Friend Failed!');
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
