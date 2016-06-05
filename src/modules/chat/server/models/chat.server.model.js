'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Conversation Schema
 */
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
  participants: {
    type: [{ type: Schema.ObjectId, ref: 'User' }],
    default: []
  }
});

mongoose.model('Conversation', ConversationSchema);

/**
* Message Schema
*/

var MessageSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  sender: {},
  receiver: {
    type: String,
    default: null
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  conversationId: {
    type: Schema.ObjectId,
    ref: 'Conversation'
  }
});

mongoose.model('Message', MessageSchema);
