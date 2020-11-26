const { Schema, model } = require('mongoose');
const GENDER = {
    Male: 0,
    Female: 1,
};
const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, required: true },
    mobile: { type: String },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: {
        type: Number,
        enum: [GENDER.Male, GENDER.Female],
    },
});

const User = model('User', UserSchema);
module.exports = User;
