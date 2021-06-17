var express = require('express');
var router = express.Router();
var UserController = require('../controller/users');

router.post('/register', (req, res, next) => {
  UserController.createUser(req, res, next);
})

router.post('/login', (req, res, next) => {
  UserController.logIn(req, res, next);
})

router.post('/logout', (req, res, next) => {
  UserController.logOut(req, res, next);
})

router.patch('/updateProfilePic', (req, res, next) => {
  UserController.updateProfilePic(req, res, next);
})

router.get('/getLoggedInUser', (req, res, next) => {
  UserController.getLoggedInUser(req, res, next);
})

router.get('/getUser/:username', (req, res, next) => {
  UserController.getUser(req, res, next);
})

router.get('/search/:searchTerm', (req, res, next) => {
  UserController.searchUsers(req, res, next);
})

module.exports = router;
