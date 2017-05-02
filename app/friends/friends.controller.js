(function(){
  'use strict';

  const API_URL = getHostUrl();

  angular
    .module('sumApp')
    .controller('FriendsController', FriendsController);

    function FriendsController($scope, $http, $location, $stateParams, $state) {
      console.log('This is the FriendsController...');
      const vm = this;

      console.log("USER_ID= "+$stateParams.user_id);

      vm.user_id = $stateParams.user_id;

      vm.$onInit = function(){

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

      vm.getFriends();

    };

    vm.resetForm = function(){
      if (!$scope.addFriendForm.$pristine) {
        vm.data.name = "";
        vm.data.email = "";
      }
      $scope.addFriendForm.$setPristine(); //reset Form
      // if (!$scope.updateFriendForm.$pristine) {
      //   vm.data.name = "";
      //   vm.data.email = "";
      // }
      // $scope.updateFriendForm.$setPristine();
    }
    vm.resetForm2 = function(){
      if (!$scope.updateFriendForm.$pristine) {
        vm.data.name = "";
        vm.data.email = "";
      }
      $scope.updateFriendForm.$setPristine();
    }

    vm.friendEdit = [];
     vm.editFriendInfo = function (id){
       if (vm.friendEdit[id] == false || !vm.friendEdit[id]){

         console.log(vm.friendEdit[id]);
         vm.friendEdit[id] = true;
         vm.friendEdit1 = true;
       } else {
        //  vm.resetForm2();
         console.log(vm.friendEdit[id]);
         vm.friendEdit[id]= false;
         vm.friendEdit1 = false;
       }
     }

     vm.getFriends = function(){
       $http.get(`${API_URL}/user/${vm.user_id}/friends`)
       .then(function (response) {
         vm.friends = response.data;
         console.log(response.data);
       });
     }

     vm.addFriend = function() {
       console.log("Add Friend");
         vm.data.user_id = vm.user_id;
         console.log(vm.data);
         $http.post(`${API_URL}/user/${vm.user_id}/friends`, vm.data)
         .then(function(data) {
           console.log(data);
           vm.getFriends();
           vm.friendEditDropdown = false;
           vm.resetForm();

          //  $location.url('/profile/friends');
         }, function() {
           console.log('NewItem Failed!');
         });
       }

     vm.editFriend = function(){
       if (vm.friendEditDropdown == false || !vm.friendEditDropdown ){
         vm.friendEditDropdown = true;
       } else {
         vm.resetForm();
         vm.friendEditDropdown= false;
       }
     }

     vm.updateFriend = function(id){
      //  vm.resetForm2();
      console.log("Member ID"+$scope.member_id);
       let data = [];
       data.user_id =  $stateParams.id;
       data.friend_id = id;
       data.friend_name = vm.friend_edit[id].name;
       data.friend_email = vm.friend_edit[id].email;
       console.log(data);
      //  $http.put(`${API_URL}/user/${vm.user_id}/friends/${vm.friend_id}`, vm.data)
      //  .then(function(data) {
      //    console.log(data);
      //    vm.getFriends();
      //    vm.friendEditDropdown = false;
      //    vm.resetForm();
       //
      //   //  $location.url('/profile/friends');
      //  }, function() {
      //    console.log('NewItem Failed!');
      //  });
       console.log("Updated Friend");
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
