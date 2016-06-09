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
    vm.map = null;
    vm.authentication = Authentication;
    $scope.transportLocations = [];
    $scope.schoolLocations = [];
    $scope.isError = false;
    var service = null;
    $scope.map = null;
    $scope.currentLocation = new google.maps.LatLng(vm.authentication.user.latitude, vm.authentication.user.longitude);
    $scope.showDetails = function(e, place) {
      vm.place = place;
      $scope.map.showInfoWindow('facilitiesInfo', place.facility_number);
    };
    if (vm.authentication.user) {
      document.body.style.background = "#fff";
    }
    function getSchools() {
      var request = {
        location: $scope.currentLocation,
        radius: '16093 ',
        types: ['school']
      };
      NgMap.getMap().then(function(map) {
        $scope.map = map;
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, function(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              $scope.schoolLocations
              .push({
                lat: results[i].geometry.location.lat(),
                lng: results[i].geometry.location.lng(),
                name: results[i].name
              });
            }
          }
          $scope.$digest();
        });
      });
    }
    /* function getTransport() {
      var t_array = [];
      NgMap.getMap().then(function(map) {
        var request = {
          location: $scope.currentLocation,
          radius: '16093 ',
          types: ['subway_station', 'taxi_stand', 'train_station', 'transit_station']
        };
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, function(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              $scope.transportLocations
              .push({
                lat: results[i].geometry.location.lat(),
                lng: results[i].geometry.location.lng(),
                name: results[i].name
              });
            }
          }
          $scope.$digest();
        });
      });
    }*/
    function getFacilities() {
      var url = 'https://chhs.data.ca.gov/resource/mffa-c6z5.json?$where=within_circle(location,' + vm.authentication.user.latitude + ',' + vm.authentication.user.longitude + ',' + '16093)&facility_status=LICENSED';
      $http.get(url)
      .success(function(data, status, headers, config) {
        $scope.locations = data;
      })
      .error(function(data, status, headers, config) {
        console.log(data);
      });
    }
    $scope.getData = function() {
      if ($scope.transport && $scope.schools && $scope.facilities) {
        getSchools();
        getTransport();
        getFacilities();
      } else if ($scope.transport && !$scope.schools && $scope.facilities) {
        $scope.schoolLocations = [];
        getTransport();
        getFacilities();
      } else if (!$scope.transport && $scope.schools && $scope.facilities) {
        $scope.transportLocations = [];
        getSchools();
        getFacilities();
      } else if (!$scope.transport && !$scope.schools && $scope.facilities) {
        $scope.transportLocations = [];
        $scope.schoolLocations = [];
        getFacilities();
      } else if (!$scope.transport && $scope.schools && !$scope.facilities) {
        $scope.transportLocations = [];
        $scope.locations = [];
        getSchools();
      } else if (!$scope.schools && !$scope.facilities) {
        $scope.schoolLocations = [];
        $scope.locations = [];
      }
    };
  }
}());
