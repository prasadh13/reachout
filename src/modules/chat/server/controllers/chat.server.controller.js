'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Message = mongoose.model('Message'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * List of Messages
 */
exports.getByUsername = function (req, res) {
  console.log(req.user.username);
  Message.find({ receiver: req.user.username }).sort('-created').exec(function (err, archiveMessages) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      console.log(archiveMessages);
      res.json(archiveMessages);
    }
  });
};

/**
 * Chat middleware
 */
exports.chatByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Chat is invalid'
    });
  }

  Message.findById(id).exec(function (err, cMessage) {
    if (err) {
      return next(err);
    } else if (!cMessage) {
      return res.status(404).send({
        message: 'No message with that identifier has been found'
      });
    }
    req.cMessage = cMessage;
    next();
  });
};