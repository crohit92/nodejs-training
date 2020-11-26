const mongoose = require('mongoose');
const { College, Student, Course } = require('./college');
mongoose.connect('mongodb://localhost:27017/colleges', (err) => {
    const dav = new College({
        name: 'DAV College',
        address: {
            city: 'Amritsar',
            state: 'Punjab',
            country: 'India',
        },
        students: [],
    });
    const lalit = new Student({
        firstName: 'Lalit',
        lastName: 'Shrivastav',
        age: 13,
        // address: {}
        courses: [],
    });

    const BCA = new Course({
        name: 'BCA',
        code: 'BCA',
        duration: 3,
        fees: 10,
    });
    dav.students.push(lalit);
    lalit.courses.push(BCA);
    Promise.all([BCA.save(), lalit.save(), dav.save()])
        .then(() => {
            console.log('all data Saved');
        })
        .catch((err) => {
            console.error(err);
        });
});
