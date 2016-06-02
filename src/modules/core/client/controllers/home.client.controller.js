(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', '$state', 'Authentication', '$http', 'NgMap'];

  function HomeController($scope, $state, Authentication, $http, NgMap) {
    var vm = this;
    vm.authentication = Authentication;
    $scope.locations = [];
    /*
    if (typeof google === 'object' && typeof google.maps === 'object') {
      console.log("loading maps");
      var current = new google.maps.LatLng(vm.authentication.user.latitude, vm.authentication.user.longitude);
      console.log(current);
    }*/
    // var current = new google.maps.LatLng(vm.authentication.user.latitude, vm.authentication.user.longitude);
    // $scope.googleMapsUrl = 'AIzaSyBFYPYF1sV_cM-Bb_x-hi9Gpwg9K8WB7nA';
    $scope.getData = function() {
      /*
      NgMap.getMap().then(function(map) {
        console.log(map.getCenter());
        console.log(map);
        console.log('markers', map.markers);
        console.log('shapes', map.shapes);
        var current = new google.maps.LatLng(vm.authentication.user.latitude, vm.authentication.user.longitude);
        var request = {
          location: current,
          radius: '16093 ',
          types: ['subway_station', 'taxi_stand', 'train_station', 'transit_station']
        };
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, function(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              console.log(results);
            }
          }
        });
      });*/
      $http.get('https://chhs.data.ca.gov/resource/mffa-c6z5.json?facility_status=LICENSED')
        .success(function(data, status, headers, config) {
          console.log(data);
          $scope.locations = data;
        })
        .error(function(data, status, headers, config) {
          console.log(data);
        });
    };
  }
}());
