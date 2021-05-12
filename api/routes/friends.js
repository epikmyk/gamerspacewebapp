var express = require('express');
var router = express.Router();
var FriendsController = require('../controller/friends');
const FriendsModel = require('../model/friends');

router.post('/addFriend', (req, res, next) => {
  FriendsController.addFriend(req, res, next);
})

router.post('/acceptFriendRequest', (req, res, next) => {
  FriendsController.acceptFriendRequest(req, res, next);
})

router.delete('/declineFriendRequest/:user_id/:friend_id', (req, res, next) => {
  FriendsController.deleteFriend(req, res, next);
})

router.get('/getFriendStatus/:username/:friendUsername', (req, res, next) => {
  FriendsController.getFriendStatus(req, res, next);
})

router.get('/getFriendRequests', (req, res, next) => {
  FriendsController.getFriendRequests(req, res, next);
})

router.get('/getFriends', (req, res, next) => {
  FriendsController.getFriends(req, res, next);
})

module.exports = router;