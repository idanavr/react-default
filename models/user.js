/* global require module */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        gender: {
            type: String,
            required: true,
        },
        // date: {
        //     type: Date,
        //     default: Date.now,
        // },
    },
    {
        versionKey: false,
    }
);

module.exports = mongoose.model('users', userSchema);