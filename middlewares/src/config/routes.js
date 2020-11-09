const router = require('express').Router();

router.use('/users', require('../users/user.controller'));

module.exports = router;
