const router = require('express').Router();
// module.exports = function configureRoutes(app) {
router.post('/', (req, res) => {
    // handle the request body and create a booking
    res.json(req.body);
});
// };
module.exports = router;
