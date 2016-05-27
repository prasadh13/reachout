(function () {
  'use strict';

  angular
    .module('users')
    .controller('AuthenticationController', AuthenticationController);

  AuthenticationController.$inject = ['$scope', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator'];

  function AuthenticationController($scope, $state, $http, $location, $window, Authentication, PasswordValidator) {
    var vm = this;

    vm.authentication = Authentication;
    vm.getPopoverMsg = PasswordValidator.getPopoverMsg;
    vm.signup = signup;
    vm.signin = signin;
    vm.callOauthProvider = callOauthProvider;
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
    // Get an eventual error defined in the URL query string:
    vm.error = $location.search().err;

    // If user is signed in then redirect back home
    if (vm.authentication.user) {
      $location.path('/');
    }

    function signup(isValid) {
      vm.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }
      console.log(vm.credentials);
      $http.post('/api/auth/signup', vm.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        vm.authentication.user = response;

        // And redirect to the previous or home page
        $state.go($state.previous.state.name || 'home', $state.previous.params);
      }).error(function (response) {
        vm.error = response.message;
      });
    }
    function uploadImage(e) {
      $scope.image = e.target.files[0];
    }

    function signin(isValid) {
      vm.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }
      var address = vm.credentials.stAddr1 + ', ' + vm.credentials.city + ', ' + vm.credentials.state;
      console.log(address);
      $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address)
        .success(function(data, status, headers, config) {
          console.log(data);
          $scope.locations = data;
          vm.credentials.latitude = data.results[0].geometry.location.lat;
          vm.credentials.longitude = data.results[0].geometry.location.lng;
          console.log(vm.credentials.latitude);
          console.log(vm.credentials.longitude);
          $http.post('/api/auth/signin', vm.credentials).success(function (response) {
            // If successful we assign the response to the global user model
            vm.authentication.user = response;
            // ItemsService.saveItem(response, $scope.image);
            // And redirect to the previous or home page
            $state.go($state.previous.state.name || 'home', $state.previous.params);
          }).error(function (response) {
            vm.error = response.message;
          });
        })
        .error(function(data, status, headers, config) {
          console.log(data);
        });
    }

    // OAuth provider request
    function callOauthProvider(url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    }
  }
}());
