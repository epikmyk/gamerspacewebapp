var express = require('express');
var router = express.Router();
var MessageController = require('../controller/messages');

router.post('/createMessage', (req, res, next) => {
    MessageController.createMessage(req, res, next);
})

router.get('/getMessages/:chat_id', (req, res, next) => {
    MessageController.getMessages(req, res, next);
})

module.exports = router;