var express = require('express');
var router = express.Router();
var UserController = require('../controller/users');

/* GET users listing. */
router.post('/register', (req, res, next) => {
  UserController.createUser(req, res, next);
})

module.exports = router;
