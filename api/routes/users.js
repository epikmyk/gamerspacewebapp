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

router.get('/getLoggedInUsername', (req, res, next) => {
  UserController.getLoggedInUsername(req, res, next);
})

module.exports = router;
