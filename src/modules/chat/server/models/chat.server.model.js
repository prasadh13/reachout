'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Conversation Schema
 */
/*
var ConversationSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  caseId: {
    type: String,
    default: '',
    trim: true
  },
  caseworker: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  participants: {
    type: [{ type: Schema.ObjectId, ref: 'User' }],
    default: []
  }
});

mongoose.model('Conversation', ConversationSchema);*/

/**
* Message Schema
*/

var MessageSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  sender: {},
  receiver: {},
  casenumber: {},
  content: {
    type: String,
    default: '',
    trim: true
  }
});

mongoose.model('Message', MessageSchema);
