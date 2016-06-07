(function () {
  'use strict';

  angular
    .module('users')
    .controller('EditProfileController', EditProfileController);

  EditProfileController.$inject = ['$scope', '$state', '$timeout', '$window', '$http', '$location', 'UsersService', 'Authentication', 'FileUploader'];

  function EditProfileController($scope, $state, $timeout, $window, $http, $location, UsersService, Authentication, FileUploader) {
    var vm = this;
    var defaultImageURL = 'modules/users/client/img/profile/default.png';
    vm.user = Authentication.user;
    vm.updateUserProfile = updateUserProfile;
    vm.imageURL = vm.user.profileImageURL || defaultImageURL;
    vm.uploadProfilePicture = uploadProfilePicture;
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
    vm.cancelUpload = cancelUpload;
    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: 'api/users/picture',
      alias: 'newProfilePicture',
      onAfterAddingFile: onAfterAddingFile,
      onSuccessItem: onSuccessItem,
      onErrorItem: onErrorItem
    });

    // Set file uploader image filter
    vm.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // Called after the user selected a new picture file
    function onAfterAddingFile(fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            vm.imageURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    }

    // Called after the user has successfully uploaded a new picture
    function onSuccessItem(fileItem, response, status, headers) {
      // Show success message
      vm.success2 = true;

      // Populate user object
      vm.user = Authentication.user = response;
      console.log("new photo");
      console.log(vm.user);

      // Clear upload buttons
      cancelUpload();
    }

    // Called after the user has failed to uploaded a new picture
    function onErrorItem(fileItem, response, status, headers) {
      // Clear upload buttons
      cancelUpload();

      // Show error message
      vm.error2 = response.message;
    }

    // Change user profile picture
    function uploadProfilePicture() {
      // Clear messages
      vm.success = vm.error = null;

      // Start upload
      vm.uploader.uploadAll();
    }

    // Cancel the upload process
    function cancelUpload() {
      vm.uploader.clearQueue();
      vm.imageURL = vm.user.profileImageURL || defaultImageURL;
    }
    // Update a user profile
    function updateUserProfile(isValid) {
      vm.success = vm.error = null;
      vm.success2 = vm.error2 = null;
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }
      var address = vm.user.stAddr1 + ', ' + vm.user.city + ', ' + vm.user.state;
      console.log(vm.user);
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
      vm.uploader.uploadAll();
    }
  }
}());
