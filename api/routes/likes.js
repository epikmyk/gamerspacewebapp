var express = require('express');
var router = express.Router();
var LikeController = require('../controller/likes');

router.post('/createLike', (req, res, next) => {
    LikeController.likePost(req, res, next);
})

router.get('/getLike/:post_id', (req, res, next) => {
    LikeController.getLike(req, res, next);
})

module.exports = router;