/* global require module */
const mongoose = require('mongoose');
const { Schema } = mongoose;

function emailValidator(email) {
    return (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(email);
  }

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First name is required'],
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
        },
        email: {
            type: String,
            required: [true, 'Email name is required'],
            unique: true,
            validate: {
                validator: emailValidator,
                message: '{VALUE} is not a valid email'
              },
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        gender: {
            type: String,
            required: [true, 'Gender is required'],
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