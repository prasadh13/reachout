/* eslint no-loop-func: 0 */
'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Message = mongoose.model('Message'),
  User = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
var connectedUsers = {};
// Create the chat configuration
module.exports = function (io, socket, req, res) {
  var sessionUsers = {};
  connectedUsers[socket.request.user.username] = socket;
  if (socket) {
    console.log(socket.request.user.username + 'just logged in');
  }
  socket.on('newUser', function(data) {
    sessionUsers = data;
    console.log("Session started");
    console.log(Object.keys(sessionUsers));
    connectedUsers[socket.request.user.username].emit('adduser', { text: "You started a discussion" });
    /*
    onlineUsers[data.username] = data;
    io.emit('adduser', onlineUsers);*/
  });
  socket.on('chatMessage', function(data) {
    var message = null;
    var msgOrigin = null;
    var caseId = data.caseId;
    console.log("connected users");
    console.log(Object.keys(connectedUsers));
    for (var participant in sessionUsers) {
      if (participant in connectedUsers) {
        msgOrigin = {
          username: socket.request.user.username,
          profileImageUrl: socket.request.user.profileImageURL
        };
        console.log(participant + " is online");
        var msg = {};
        msg.text = data.text;
        msg.type = 'message';
        msg.created = Date.now();
        msg.profileImageURL = socket.request.user.profileImageURL;
        msg.username = socket.request.user.username;
        message = new Message({
          sender: msgOrigin,
          receiver: participant,
          content: data.text,
          casenumber: caseId
        });
        connectedUsers[participant].emit('chatMessage', msg);
        message.save(function (err) {
          if (err) {
            console.log("message could not be saved :(");
          } else {
            console.log("message saved!");
          }
        });
        /*
        connectedUsers[socket.request.user.username].emit('showSelf', msg);
        connectedUsers[data.receiver].emit('chatMessage', msg);*/
      } else {
        console.log("user is offline. saving the mesage in database");
        msgOrigin = {
          username: socket.request.user.username,
          profileImageUrl: socket.request.user.profileImageURL
        };
        message = new Message({
          sender: msgOrigin,
          receiver: participant,
          content: data.text,
          casenumber: caseId
        });
        connectedUsers[socket.request.user.username].emit('offline', { text: participant + ' is currently offline' });
        message.save(function (err) {
          if (err) {
            console.log("message could not be saved :(");
          }
        });
      }
    }
  });
  // Emit the status event when a socket client is disconnected
  socket.on('disconnect', function () {
    console.log("disconnecting the socket");
    delete connectedUsers[socket.request.user.username];
    /*
    io.emit('adduser', onlineUsers);*/
  });
};

