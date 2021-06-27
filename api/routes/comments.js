var express = require('express');
var router = express.Router();
var CommentController = require('../controller/comments');

router.post('/createComment', (req, res, next) => {
    CommentController.createComment(req, res, next);
})

router.get('/getComments/:post_id', (req, res, next) => {
    CommentController.getComments(req, res, next);
})

module.exports = router;