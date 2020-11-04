const router = require('express').Router();
router.get('/bookings', (req, res) => {
    res.json([
        {
            users: 'First User',
            amount: 250,
        },
        {
            users: 'Second User',
            amount: 500,
        },
    ]);
});

module.exports = router;
