const transaction = require('../helpers/transaction');
const User = require('./user.model');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authGuard = require('../helpers/auth-guard');
const { Types } = require('mongoose');

router.post(
    '/',
    transaction(async (req, res) => {
        const payload = req.body;
        payload.password = bcrypt.hashSync(payload.password, 5);
        const user = new User(payload);
        const response = (await user.save()).toObject();
        delete response.password;
        res.json(response);
    })
);
router.post(
    '/login',
    transaction(async (req, res) => {
        /**
         * {
         *  username:"",
         *  password:""
         * }
         */
        const credentials = req.body;
        const match = await User.findOne({
            userName: credentials.userName,
        });
        if (match) {
            if (bcrypt.compareSync(credentials.password, match.password)) {
                const token = jwt.sign(
                    { _id: match._id.toString() },
                    process.env.secret
                );
                res.json({ id: match._id.toString(), token });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    })
);

router.get(
    '/',
    authGuard,
    transaction(async (req, res) => {
        res.json(await User.find());
    })
);
router.get(
    '/by-ids',
    authGuard,
    transaction(async (req, res) => {
        // http://localhost:3000/users/by-ids?ids=jsdkjas,ashdjgasjh,sadjkhsakdjh
        let ids = ((req.query || {}).ids || '')
            .split(',')
            .map((id) => id.trim())
            .filter((id) => id);

        ids = ids.filter((id) => id !== req.uid);

        res.json(
            await User.find({
                _id: { $in: ids.map((id) => Types.ObjectId(id)) },
            })
        );
    })
);
module.exports = router;
