module.exports = function authGuard(req, res, next) {
    if (!req.query.isAuth) {
        next({ message: 'you are unauthenticated' });
    } else {
        next();
    }
};
