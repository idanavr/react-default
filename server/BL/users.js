const mongoose = require('mongoose');
const userModel = require('../models/db/user');
const userAdapters = require('../models/client/user');

module.exports = {
    getUsers: () =>
        userModel.find()
            .exec()
            .then((users) => {
                if (!users) {
                    return null;
                }
                const responseUsers = users.map((user) => userAdapters.createUserModel(user));
                return responseUsers;
            }),

    getUser: (id) =>
        userModel.findOne({ _id: new mongoose.Types.ObjectId(id) })
            .exec()
            .then((user) => {
                if (!user) {
                    return null;
                }
                const responseUser = userAdapters.createUserModel(user);
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
        return newUserModelPromise.then((newUserModel) => userAdapters.createUserModel(newUserModel))
        .catch((err) => ({ err }));
    },

    updateUser: (userId, params) => userModel.findById(userId)
        .then((userToChange) => {
            if (userToChange.password !== params.oldPassword)
                return { err: { clientMessage: 'Incorrect password' } };
            userToChange.firstName = params.firstName;
            userToChange.lastName = params.lastName;
            userToChange.email = params.email;
            if (params.newPassword)
                userToChange.password = params.newPassword;
            userToChange.gender = params.gender;

            const updatedUserModelPromise = userToChange.save();
            return updatedUserModelPromise.then((updatedUserModel) => userAdapters.createUserModel(updatedUserModel));
        })
        .catch((err) => ({ err })),

    deleteUser: (id) =>
        userModel.find({ _id: id }).deleteOne()
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