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
  if (req.params.state === '1') {
    console.log("after siging in");
    Message.find({ $and: [{ receiver: req.user.username }, { 'sender.username': req.params.sender }, { 'casenumber': req.params.caseId }, { created: { $gte: req.user.lastActivity } }] }).sort('-created').exec(function (err, archiveMessages) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(archiveMessages);
      }
    });
  } else {
    console.log("after tab window");
    Message.find({ $or: [{ $and: [{ receiver: req.user.username }, { 'sender.username': req.params.sender }, { 'casenumber': req.params.caseId }] }, { $and: [{ receiver: req.params.sender }, { 'sender.username': req.user.username }, { 'casenumber': req.params.caseId }] }] }).sort('-created').exec(function (err, archiveMessages) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(archiveMessages);
      }
    });
  }
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
