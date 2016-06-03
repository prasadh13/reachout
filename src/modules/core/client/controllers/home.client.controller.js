/* eslint no-undef: 0 */
/* eslint eqeqeq: 0 */
(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', '$state', 'Authentication', '$http', 'NgMap'];

  function HomeController($scope, $state, Authentication, $http, NgMap) {
    var vm = this;
    vm.authentication = Authentication;
    $scope.transportLocations = [];
    $scope.schoolLocations = [];
    var service = null;
    $scope.currentLocation = new google.maps.LatLng(vm.authentication.user.latitude, vm.authentication.user.longitude);
    function getSchools() {
      var request = {
        location: $scope.currentLocation,
        radius: '16093 ',
        types: ['school']
      };
      NgMap.getMap().then(function(map) {
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, function(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              $scope.schoolLocations
              .push({
                lat: results[i].geometry.location.lat(),
                lng: results[i].geometry.location.lng()
              });
              /*
              var marker = new google.maps.Marker({
                title: results[i].name,
                map: map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
                position: results[i].geometry.location
              });*/
            }
          }
          $scope.$digest();
        });
      });
    }
    function getTransport() {
      var t_array = [];
      NgMap.getMap().then(function(map) {
        console.log(map);
        var request = {
          location: $scope.currentLocation,
          radius: '16093 ',
          types: ['subway_station', 'taxi_stand', 'train_station', 'transit_station']
        };
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, function(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              var position = {
                lat: results[i].geometry.location.lat(),
                lng: results[i].geometry.location.lng()
              };
              $scope.transportLocations
              .push({
                lat: results[i].geometry.location.lat(),
                lng: results[i].geometry.location.lng()
              });
            }
          }
          $scope.$digest();
        });
      });
    }
    function getFacilities() {
      var url = 'https://chhs.data.ca.gov/resource/mffa-c6z5.json?$where=within_circle(location,' + vm.authentication.user.latitude + ',' + vm.authentication.user.longitude + ',' + '16093)&facility_status=LICENSED';
      $http.get(url)
      .success(function(data, status, headers, config) {
        console.log("fetching facilities");
        $scope.locations = data;
      })
      .error(function(data, status, headers, config) {
        console.log(data);
      });
    }
    $scope.getData = function() {
      $scope.locations = [];
      $scope.transportLocations = [];
      $scope.schoolLocations = [];
      if ($scope.transport && $scope.schools && $scope.facilities) {
        getSchools();
        getTransport();
        getFacilities();
      } else if ($scope.transport && $scope.schools && !$scope.facilities) {
        console.log("fetching both");
        getSchools();
        getTransport();
      } else if ($scope.transport && !$scope.schools && $scope.facilities) {
        getTransport();
        getFacilities();
      } else if (!$scope.transport && $scope.schools && $scope.facilities) {
        getSchools();
        getFacilities();
      } else if (!$scope.transport && !$scope.schools && $scope.facilities) {
        getFacilities();
      } else if (!$scope.transport && $scope.schools && !$scope.facilities) {
        console.log("fetching schools");
        getSchools();
      } else if ($scope.transport && !$scope.schools && !$scope.facilities) {
        console.log("fetching transport");
        getTransport();

      }
    };
  }
}());
