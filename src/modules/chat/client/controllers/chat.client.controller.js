(function () {
  'use strict';

  angular
    .module('chat')
    .controller('ChatController', ChatController);

  ChatController.$inject = ['$scope', '$state', 'Authentication', 'Socket', '$timeout'];

  function ChatController($scope, $state, Authentication, Socket, $timeout) {
    var vm = this;
    vm.messages = [];
    vm.users = [];
    vm.messageText = '';
    vm.sendMessage = sendMessage;
    vm.authentication = Authentication;
    vm.chat = chat;
    vm.to = null;
    vm.chatWindow = false;
    init();

    function init() {
      // If user is not signed in then redirect back home
      if (!Authentication.user) {
        $state.go('home');
      }

      // Make sure the Socket is connected
      if (!Socket.socket) {
        Socket.connect();
      }
      var userinfo = {
        type: 'status',
        created: Date.now(),
        profileImageURL: Authentication.user.profileImageURL,
        username: Authentication.user.username,
        online: true
      };
      $timeout(function() {
        Socket.emit('newUser', userinfo);
      }, 2000);
      Socket.on('adduser', function(response) {
        vm.users = response;
      });
      // Event listner for user's online status
      // Add an event listener to the 'chatMessage' event
      Socket.on('chatMessage', function (message) {
        vm.messages.unshift(message);
        vm.to = message.username;
        $scope.$apply();
      });
      Socket.on('showSelf', function (message) {
        vm.messages.unshift(message);
        $scope.$apply();
      });
      Socket.on('onlineUsers', function (user) {
        console.log(user);
        vm.users.unshift(user);
        $scope.$digest();
      });
      // Remove the event listener when the controller instance is destroyed
      $scope.$on('$destroy', function () {
        $timeout(function() {
          Socket.removeListener('adduser');
        }, 2000);
      });
    }
    function chat(to) {
      vm.chatWindow = true;
      vm.to = to;
    }
    // Create a controller method for sending messages
    function sendMessage() {
      console.log(vm.to);
      // Create a new message object
      var message = {
        text: vm.messageText,
        receiver: vm.to,
        sender: vm.authentication.user.username
      };
      // Emit a 'chatMessage' message event
      Socket.emit('chatMessage', message);

      // Clear the message text
      vm.messageText = '';
    }
  }
}());
