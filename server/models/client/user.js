// These models are the API responses.

module.exports = {
    createUserModel: (user) => {
        const responseUser = {
            id: user._id || user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            gender: user.gender,
            role: user.role
        };
        return responseUser;
    },
};