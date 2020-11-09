const router = require('express').Router();
const authGuard = require('../middlewares/auth-guard');

// router.use(authGuard);
router.get(
    '/',
    (req, res, next) => {
        console.log('Preprocessing request');
        next();
    },
    (req, res) => {
        console.log('Request for users');
        res.json(['User1', 'User2']);
    }
);

router.post('/', authGuard, (req, res) => {
    res.json(['User1', 'User2']);
});

module.exports = router;
