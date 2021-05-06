var express = require('express');
var router = express.Router();
var FriendsController = require('../controller/friends');

router.post('/addFriend', (req, res, next) => {
  UserController.createUser(req, res, next);
})

router.post('/acceptFriendRequest', (req, res, next) => {
  UserController.logIn(req, res, next);
})

router.post('/declineFriendRequest', (req, res, next) => {
  UserController.logOut(req, res, next);
})

router.get('/getFriendStatus', (req, res, next) => {
  FriendsController.getFriendStatus(req, res, next);
})

module.exports = router;