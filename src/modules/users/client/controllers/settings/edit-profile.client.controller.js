(function () {
  'use strict';

  angular
    .module('users')
    .controller('EditProfileController', EditProfileController);

  EditProfileController.$inject = ['$scope', '$http', '$location', 'UsersService', 'Authentication'];

  function EditProfileController($scope, $http, $location, UsersService, Authentication) {
    var vm = this;

    vm.user = Authentication.user;
    console.log(vm.user);
    vm.updateUserProfile = updateUserProfile;
    vm.stateList = [
      'Alabama', 'Alaska', 'Arizona', 'Arkansas',
      'California', 'Colorado', 'Connecticuit',
      'Delaware', 'District of Colombia',
      'Florida', 'Georgia', 'Hawaii',
      'Idaho', 'Illinois', 'Indiana', 'Iowa',
      'Kansas', 'Kentucky', 'Louisiana',
      'Maine', 'Maryland', 'Massacheusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
      'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
      'North Carolina', 'North Dakota', 'Ohio', 'Okhlahoma', 'Oregon',
      'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
      'Tennessee', 'Texas', 'Utha', 'Vermont', 'Virginia',
      'Washington', 'West Virgina', 'Wisconsin', 'Wyoming'
    ];

    // Update a user profile
    function updateUserProfile(isValid) {
      vm.success = vm.error = null;
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }
      var address = vm.user.stAddr1 + ', ' + vm.user.city + ', ' + vm.user.state;
      console.log(address);
      $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address)
        .success(function(data, status, headers, config) {
          console.log(data);
          $scope.locations = data;
          vm.user.latitude = data.results[0].geometry.location.lat;
          vm.user.longitude = data.results[0].geometry.location.lng;
          console.log(vm.user.latitude);
          console.log(vm.user.longitude);
          var user = new UsersService(vm.user);
          user.$update(function (response) {
            $scope.$broadcast('show-errors-reset', 'vm.userForm');

            vm.success = true;
            Authentication.user = response;
          }, function (response) {
            vm.error = response.data.message;
          });
        })
        .error(function(data, status, headers, config) {
          console.log(data);
        });
      /*
      console.log("User longitude = " + vm.user.longitude);
      console.log("User latitude = " + vm.user.latitude);
      */

      /*
      var user = new UsersService(vm.user);

      user.$update(function (response) {
        $scope.$broadcast('show-errors-reset', 'vm.userForm');

        vm.success = true;
        Authentication.user = response;
      }, function (response) {
        vm.error = response.data.message;
      });
      */
    }
  }
}());
