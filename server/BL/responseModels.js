// These are the models the client will receive from the API.

module.exports = {
    createResponseUserModel: (user) => {
        const responseUser = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            gender: user.gender,
        };
        return responseUser;
    },

};