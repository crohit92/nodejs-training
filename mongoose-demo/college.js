const { Schema, model, Types } = require('mongoose');

const CollegeSchema = new Schema({
    // name: String,
    name: { type: String, required: true },
    address: {
        city: { type: String },
        state: { type: String },
        country: { type: String },
    },
    students: [
        {
            type: Types.ObjectId,
            ref: 'Student',
        },
    ],
});

const StudentSchema = new Schema({
    firstName: String,
    lastName: { type: String },
    age: Number,
    address: {
        city: String,
        state: String,
    },
    courses: [
        {
            type: Types.ObjectId,
            ref: 'Course',
        },
    ],
});
const CourseSchema = new Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    duration: { type: String, required: true },
    fees: { type: String, required: true },
});

module.exports = {
    Course: model('Course', CourseSchema),
    Student: model('Student', StudentSchema),
    College: model('College', CollegeSchema),
};
