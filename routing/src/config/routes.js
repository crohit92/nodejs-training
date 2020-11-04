const users = require('../users/users.controller');
const bookings = require('../bookings/bookings.controller');
const admin = require('../admin/bookings/bookings.controller');
const router = require('express').Router();
// module.exports = function configureRoutes(app) {
// users(app);
// bookings(app);
// adminBookings(app);
// };
router.use('/users', users);
router.use('/bookings', bookings);
router.use('/admin', admin);

module.exports = router;
