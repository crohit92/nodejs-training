const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
    const token = (req.get('authorization') || '').split(' ').pop();
    if (token) {
        jwt.verify(token, process.env.secret, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    message: 'You are not authorized for this request',
                });
            } else {
                console.log(`Request made by: ${decoded._id}`);
                req.uid = decoded._id;
                next();
            }
        });
    } else {
        res.status(401).json({
            message: 'You are not authorized for this request',
        });
    }
};
