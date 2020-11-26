const usersController = require('../users/users.controller');

const router = require('express').Router();

router.use('/users', usersController);
module.exports = router;
