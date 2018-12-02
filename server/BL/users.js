const mongoose = require('mongoose');
const userModel = require('../models/user');
const responseAdapters = require('./responseModels');

module.exports = {
    getUsers: () =>
        userModel.find()
            .exec()
            .then((users) => {
                if (!users) {
                    return null;
                }
                const responseUsers = users.map((user) => responseAdapters.createResponseUserModel(user));
                return responseUsers;
            }),

    getUser: (id) =>
        userModel.findOne({ _id: new mongoose.Types.ObjectId(id) })
            .exec()
            .then((user) => {
                if (!user) {
                    return null;
                }
                const responseUser = responseAdapters.createResponseUserModel(user);
                return responseUser;
            }),

    saveUser: (params) => {
        const newUser = new userModel(); // eslint-disable-line new-cap
        newUser.firstName = params.firstName;
        newUser.lastName = params.lastName;
        newUser.email = params.email;
        newUser.password = params.password;
        newUser.gender = params.gender;

        const newUserModelPromise = newUser.save();
        return newUserModelPromise.then((newUserModel) => responseAdapters.createResponseUserModel(newUserModel))
        .catch((err) => ({ err }));
    },

    updateUser: (userId, params) => userModel.findById(userId)
        .then((userToChange) => {
            userToChange.firstName = params.firstName;
            userToChange.lastName = params.lastName;
            userToChange.email = params.email;
            userToChange.password = params.password;
            userToChange.gender = params.gender;

            const updatedUserModelPromise = userToChange.save();
            return updatedUserModelPromise.then((updatedUserModel) => responseAdapters.createResponseUserModel(updatedUserModel));
        })
        .catch((err) => ({ err })),

    deleteUser: (id) =>
        userModel.find({ _id: id }).remove()
    // .then((user) => {
    //     if (user.err) {
    //         return { err: user.err };
    //     }
    //     return user;
    // })
    // .catch((err) => (
    //     { err }
    // ))
};