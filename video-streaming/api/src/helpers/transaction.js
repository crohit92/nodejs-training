module.exports = function (cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res);
        } catch (error) {
            next(error);
        }
    };
};
