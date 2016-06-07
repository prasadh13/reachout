/* eslint no-undef: 0 */
(function () {
  'use strict';

  angular
    .module('chat')
    .controller('ChatController', ChatController);

  ChatController.$inject = ['$scope', '$rootScope', '$state', 'Authentication', 'Socket', '$timeout', 'ListUsersService', '$http'];

  function ChatController($scope, $rootScope, $state, Authentication, Socket, $timeout, ListUsersService, $http) {
    var vm = this;
    vm.messages = [];
    vm.users = [];
    vm.messageText = '';
    vm.sendMessage = sendMessage;
    vm.authentication = Authentication;
    vm.getAllUsers = getAllUsers;
    vm.chat = chat;
    vm.to = null;
    vm.selectedUsers = {};
    vm.chatWindow = false;
    vm.welcomeText = null;
    vm.error = null;
    vm.archiveMessages = archiveMessages;
    vm.historyMessages = [];
    vm.casenumber = "1234";
    archiveMessages();
    $scope.notifs = {};
    init();

    function init() {
      console.log("initializing");
      // If user is not signed in then redirect back home
      if (!Authentication.user) {
        $state.go('home');
      }
      var userinfo = {
        type: 'status',
        created: Date.now(),
        profileImageURL: Authentication.user.profileImageURL,
        username: Authentication.user.username,
        online: true
      };
      /*
      $timeout(function() {
        Socket.emit('newUser', userinfo);
      }, 2000);
      */
      // Event listner for user's online status
      // Add an event listener to the 'chatMessage' event
      Socket.on('adduser', function(response) {
        vm.welcomeText = response;
        vm.historyMessages = [];
        $scope.$apply();
      });
      Socket.on('chatMessage', function (message) {
        vm.messages.unshift(message);
        console.log(message);
        $scope.notifs[message.username] = ($scope.notifs[message.username] || 0) + 1;
        $scope.$apply();
      });
      Socket.on('offline', function (response) {
        vm.welcomeText = response;
        $scope.$apply();
      });
      Socket.on('onlineUsers', function (user) {
        console.log(user);
        vm.users.unshift(user);
        $scope.$digest();
      });
    }
    console.log($state.$current.data.pageTitle);
    function archiveMessages() {
      $http.get('/api/chat/all/' + vm.casenumber).success(function (response) {
        // If successful we assign the response to the global user model
        vm.historyMessages = response;
      }).error(function (response) {
        vm.error = response.message;
      });
    }
    function chat(to) {
      vm.selectedUsers = {};
      for (var i = 0; i < vm.users.length; i++) {
        if (vm.users[i].selected === true) {
          vm.selectedUsers[vm.users[i].username] = vm.users[i];
        }
      }
      vm.selectedUsers[vm.authentication.user.username] = vm.authentication.user;
      console.log(vm.selectedUsers);
      if ((Object.keys(vm.selectedUsers).length - 1) === 0) {
        console.log(":(");
      } else {
        vm.chatWindow = true;
        vm.to = to;
        Socket.emit('newUser', vm.selectedUsers);
      }
    }
    function getAllUsers() {
      vm.users = ListUsersService.query({ 'casenumber': vm.casenumber });
    }
    // Create a controller method for sending messages
    function sendMessage() {
      console.log(vm.to);
      // Create a new message object
      var message = {
        text: vm.messageText,
        receiver: vm.to,
        sender: vm.authentication.user.username,
        caseId: vm.casenumber
      };
      // Emit a 'chatMessage' message event
      Socket.emit('chatMessage', message);

      // Clear the message text
      vm.messageText = '';
    }
  }
}());
