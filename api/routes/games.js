var express = require('express');
var router = express.Router();
var FriendsController = require('../controller/friends');
var GameController = require('../controller/games')


router.post('/addGame', (req, res, next) => {
  GameController.createGame(req, res, next);
})

router.get('/getGame/:game', (req, res, next) => {
    console.log("made it to get game api")
    GameController.getGame(req, res, next);
})

router.post('/addUserGame', (req, res, next) => {
    GameController.createUserGame(req, res, next);
})

router.get('/getUserGames', (req, res, next) => {
  FriendsController.acceptFriendRequest(req, res, next);
})

module.exports = router;