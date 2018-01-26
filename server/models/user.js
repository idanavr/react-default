const mongoose = require('mongoose');
const { Schema } = mongoose;

const enumGender = {
    values: ['male', 'female'],
    message: 'Invalid gender'
};

function emailValidator(email) {
    return (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(email);
  }

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            maxlength: [40, 'First name is too long'],
            required: [true, 'First name is required'],
        },
        lastName: {
            type: String,
            maxlength: [40, 'Last name is too long'],
            required: [true, 'Last name is required'],
        },
        email: {
            type: String,
            maxlength: [100, 'Email is too long'],
            required: [true, 'Email is required'],
            unique: true,
            validate: {
                validator: emailValidator,
                message: '{VALUE} is not a valid email'
              },
        },
        password: {
            type: String,
            minlength: [6, 'Password is too short'],
            maxlength: [100, 'Password is too long'],
            required: [true, 'Password is required'],
        },
        gender: {
            type: String,
            required: [true, 'Gender is required'],
            enum: enumGender
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