const mongoose = require('mongoose');
const UserModel = mongoose.model('User');
const userAdapters = require('../models/client/user');

module.exports = {
    getUsers: () =>
        UserModel.find()
            .exec()
            .then((users) => {
                if (!users) {
                    return null;
                }
                const responseUsers = users.map((user) => userAdapters.createUserModel(user));
                return responseUsers;
            }),

    getUserById: (id) =>
        UserModel.findOne({ _id: new mongoose.Types.ObjectId(id) })
            .exec()
            .then((user) => {
                if (!user) {
                    return null;
                }
                const responseUser = userAdapters.createUserModel(user);
                return responseUser;
            }),

    getUserByCredentials: (email, password) =>
        UserModel.findOne({ email })
            .exec()
            .then((user) => {
                if (!user || user.password !== password) {
                    return null;
                }
                const responseUser = userAdapters.createUserModel(user);
                return responseUser;
            }),

    saveUser: (params) => {
        const newUser = new UserModel(); // eslint-disable-line new-cap
        newUser.firstName = params.firstName;
        newUser.lastName = params.lastName;
        newUser.email = params.email;
        newUser.password = params.password;
        newUser.gender = params.gender && params.gender.toLowerCase();

        return newUser.save()
            .then((newUserModel) => userAdapters.createUserModel(newUserModel))
            .catch((err) => ({ err }));
    },

    updateUser: (userId, params) => UserModel.findById(userId)
        .then((userToChange) => {
            if (userToChange.password !== params.oldPassword)
                return { err: { clientMessage: 'Incorrect password' } };
            userToChange.firstName = params.firstName;
            userToChange.lastName = params.lastName;
            userToChange.email = params.email;
            if (params.newPassword)
                userToChange.password = params.newPassword;
            userToChange.gender = params.gender && params.gender.toLowerCase();

            const updatedUserModelPromise = userToChange.save();
            return updatedUserModelPromise.then((updatedUserModel) => userAdapters.createUserModel(updatedUserModel));
        })
        .catch((err) => ({ err })),

    deleteUser: (id) =>
        UserModel.find({ _id: id }).deleteOne()
};