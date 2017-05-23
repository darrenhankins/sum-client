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

          if ($stateParams.user_id == null){
            $location.url('/login');
          } else {
            vm.user_id = $stateParams.user_id;
            vm.getFriends();
          }
            //   vm.friends = [{
            //     "id": 1,
            //     "name": "Paul Kowalkski",
            //     "email": "paul@gmail.com"
            //   },
            //   {
            //     "id": 2,
            //     "name": "Jeff",
            //     "email": "jeff@gmail.com"
            //   },
            //   {
            //     "id": 3,
            //     "name": "Jim",
            //     "email": "jim@gmail.com"
            //   },
            //   {
            //     "id": 4,
            //     "name": "George",
            //     "email": "george@gmail.com"
            //   }
            // ];

        };
        if ($stateParams.user_id == null){
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
                      console.log(response.data);

                      // var objs = response.data;
                      // vm.friends = objs.sort(vm.compare);
                      // console.log(vm.friends);
                      vm.friends = response.data;
                      vm.friends.sort(function(s1, s2) {
                          var l = s1.name.toLowerCase(),
                              m = s2.name.toLowerCase();
                          return l === m ? 0 : l > m ? 1 : -1;
                      });
                  });
          }

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

          vm.updateFriend = function(id) {
              vm.friendEdit[id] = false;
              vm.friendEditDropdown = false;
              vm.friendEditing = false;
              vm.friend_edit[id].friend_id = id;
              console.log(vm.friend_edit[id]);
              $http.patch(`${API_URL}/user/${$stateParams.user_id}/friends/${id}`, vm.friend_edit[id])
                  .then(function(data) {
                      console.log(data);
                      vm.getFriends();
                      vm.resetForm(id);
                      vm.friendEditDropdown = false;
                  }, function() {
                      console.log('Update Friend Failed!');
                  });
              console.log("Updated Friend");
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
