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
      var s_array = [];
      NgMap.getMap().then(function(map) {
        var request = {
          location: $scope.currentLocation,
          radius: '16093 ',
          types: ['school']
        };
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, function(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              var position = {
                lat: results[i].geometry.location.lat(),
                lng: results[i].geometry.location.lng()
              };
              var marker = new google.maps.Marker({
                title: results[i].name,
                map: map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
                position: results[i].geometry.location
              });
            }
          }
          $scope.schoolLocations = s_array;
        });
        console.log($scope.schoolLocations);
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
              var marker = new google.maps.Marker({
                title: results[i].name,
                map: map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
                position: results[i].geometry.location
              });
            }
          }
          console.log($scope.transportLocations);
        });
      });
    }
    $scope.getData = function() {
      if ($scope.transport && $scope.schools && $scope.facilities) {
        var test1;
      } else if ($scope.transport && $scope.schools && !$scope.facilities) {
        console.log("fetching both");
        getSchools();
        getTransport();
        console.log($scope.locations);
      } else if ($scope.transport && !$scope.schools && $scope.facilities) {
        var test2;
      } else if (!$scope.transport && $scope.schools && $scope.facilities) {
        var test3;
      } else if (!$scope.transport && !$scope.schools && $scope.facilities) {
        $http.get('https://chhs.data.ca.gov/resource/mffa-c6z5.json?facility_status=LICENSED')
        .success(function(data, status, headers, config) {
          console.log(data);
          $scope.locations = data;
        })
        .error(function(data, status, headers, config) {
          console.log(data);
        });
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
