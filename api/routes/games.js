var express = require('express');
var router = express.Router();
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

router.get('/getFavoriteGames/:username', (req, res, next) => {
  GameController.getFavoriteGames(req, res, next);
})

router.get('/getMutualFavoriteGames/:user_id/:profile_user_id', (req, res, next) => {
  GameController.getMutualFavoriteGames(req, res, next);
})

module.exports = router;