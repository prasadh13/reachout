'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Conversation = mongoose.model('Conversation'),
  Message = mongoose.model('Message'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
var onlineUsers = {};
var connectedUsers = {};
// Create the chat configuration
module.exports = function (io, socket) {
  connectedUsers[socket.request.user.username] = socket;
  socket.on('newUser', function(data) {
    onlineUsers[data.username] = data;
    io.emit('adduser', onlineUsers);
  });
  socket.on('chatMessage', function(data) {
    var msg = {};
    msg.text = data.text;
    msg.type = 'message';
    msg.created = Date.now();
    msg.profileImageURL = socket.request.user.profileImageURL;
    msg.username = socket.request.user.username;
    connectedUsers[socket.request.user.username].emit('showSelf', msg);
    connectedUsers[data.receiver].emit('chatMessage', msg);
  });
  // Emit the status event when a socket client is disconnected
  socket.on('disconnect', function () {
    delete onlineUsers[socket.request.user.username];
    delete connectedUsers[socket.request.user.username];
    io.emit('adduser', onlineUsers);
  });
};
