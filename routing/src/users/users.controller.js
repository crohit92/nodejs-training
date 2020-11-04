const router = require('express').Router();
// module.exports = function configureRoutes(app) {
router.get('/', (req, res) => {
    res.json([
        {
            name: 'First User',
        },
        {
            name: 'Second User',
        },
    ]);
});
// };
module.exports = router;
