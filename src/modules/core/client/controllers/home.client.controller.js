(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', '$state', 'Authentication', '$http'];

  function HomeController($scope, $state, Authentication, $http) {
    var vm = this;
    vm.authentication = Authentication;
    $scope.locations = [];
    // $scope.googleMapsUrl = 'AIzaSyBFYPYF1sV_cM-Bb_x-hi9Gpwg9K8WB7nA';
   /* NgMap.getMap().then(function(map) {
      console.log(map.getCenter());
      console.log('markers', map.markers);
      console.log('shapes', map.shapes);
    });*/
    $scope.getData = function() {
      $http.get('https://chhs.data.ca.gov/resource/mffa-c6z5.json')
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
