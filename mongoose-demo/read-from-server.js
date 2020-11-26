const mongoose = require('mongoose');
const { College, Student, Course } = require('./college');
mongoose.connect('mongodb://localhost:27017/colleges', (err) => {
    College.find()
        .populate('students')
        .then((colleges) => {
            console.log(colleges);
        });
});
