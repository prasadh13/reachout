'use strict';

/**
 * Module dependencies
 */
var chats = require('../controllers/chat.server.controller');

module.exports = function (app) {
  // C hat collection routes
  app.route('/api/chat/all/:caseId/:sender/:state').get(chats.getByUsername);
  // Finish by binding the article middleware
  app.param('chatId', chats.chatByID);
};
