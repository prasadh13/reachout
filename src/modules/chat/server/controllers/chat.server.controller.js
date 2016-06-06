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
  Message.find({ $and: [{ $or: [{ receiver: req.user.username }, { sender: req.user.username }] }, { 'casenumber': '1234' }] }).sort('-created').exec(function (err, archiveMessages) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
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
