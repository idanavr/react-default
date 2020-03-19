const mongoose = require('mongoose');
const { Schema } = mongoose;
const { roleEnum, roles, genders } = require('./utils');

const enumGender = {
    values: genders,
    message: 'Invalid gender'
};

const roleEnumOptions = {
    values: roles,
    message: 'Invalid role'
};

function nameValidator(str) {
    return (/^[0-9a-zA-Z]+(?:[ -][0-9a-zA-Z]+)*$/).test(str);
}

function emailValidator(email) {
    return (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/).test(email);
}

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            maxlength: [50, 'First name is too long'],
            required: [true, 'First name is required'],
            validate: {
                validator: nameValidator,
                message: '{VALUE} is not a valid first name'
            },
        },
        lastName: {
            type: String,
            maxlength: [50, 'Last name is too long'],
            required: [true, 'Last name is required'],
            validate: {
                validator: nameValidator,
                message: '{VALUE} is not a valid last name'
            },
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
        createdDate: {
            type: Date,
            default: Date.now,
        },
        role: {
            type: String,
            default: roleEnum.Normal,
            enum: roleEnumOptions,
          },
    },
    {
        versionKey: false,
    }
);

const handleDuplicateUniqueKey = function handleDuplicateUniqueKey (error, res, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        error.clientMessage = 'The email is already taken';
        return next(error);
    }
    return next();
    
};

userSchema.post('save', handleDuplicateUniqueKey);
userSchema.post('update', handleDuplicateUniqueKey);
userSchema.post('findOneAndUpdate', handleDuplicateUniqueKey);
userSchema.post('insertMany', handleDuplicateUniqueKey);

let userModel = null;
try {
    userModel = mongoose.model('User');
} catch (err) {
    userModel = mongoose.model('User', userSchema);
}

module.exports = userModel;