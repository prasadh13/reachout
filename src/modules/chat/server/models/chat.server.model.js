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
    trim: true,
    required: 'Case ID cannot be blank'
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
  sender: {
    type: Schema.ObjectId,
    ref: 'User'
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
