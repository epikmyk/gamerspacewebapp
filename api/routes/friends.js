var express = require('express');
var router = express.Router();
var FriendsController = require('../controller/friends');
const FriendsModel = require('../model/friends');

router.post('/addFriend', (req, res, next) => {
  FriendsController.addFriend(req, res, next);
})

router.post('/acceptFriendRequest', (req, res, next) => {
  UserController.logIn(req, res, next);
})

router.post('/declineFriendRequest', (req, res, next) => {
  UserController.logOut(req, res, next);
})

router.get('/getFriendStatus/:username/:friendUsername', (req, res, next) => {
  FriendsController.getFriendStatus(req, res, next);
})

router.get('/getFriendRequests', (req, res, next) => {
  FriendsController.getFriendRequests(req, res, next);
})

module.exports = router;