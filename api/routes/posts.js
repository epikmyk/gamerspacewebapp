var express = require('express');
var router = express.Router();
var PostController = require('../controller/posts');



router.post('/createPost', (req, res, next) => {
    PostController.createPost(req, res, next);
})

router.get('/getRecentPostsToUser', (req, res, next) => {
    PostController.getRecentPostsToUserId(req, res, next);
})

router.get('/getUserPostsAndFriendsPosts', (req, res, next) => {
    PostController.getUserPostsAndFriendsPostsByUserId(req, res, next);
})

module.exports = router;