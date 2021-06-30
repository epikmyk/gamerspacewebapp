var express = require('express');
var router = express.Router();
var ChatController = require('../controller/chat');

router.post('/createChat', (req, res, next) => {
   ChatController.createChat(req, res, next);
})

router.get('/getChat/:user1_id/:user2_id', (req, res, next) => {
    ChatController.getChat(req, res, next);
})

router.get('/getChats', (req, res, next) => {
    ChatController.getChats(req, res, next);
})

router.get('/getUserFromChat/:post_id', (req, res, next) => {
    ChatController.getUserFromChat(req, res, next);
})

module.exports = router;