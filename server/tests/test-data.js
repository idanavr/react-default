module.exports = {
    users: {
        newUser: {
            firstName: 'first name',
            lastName: 'last name',
            email: 'newuser@email.com',
            password: '123456',
            gender: 'male'
        },
        generalUser: {
            firstName: 'general',
            lastName: 'user',
            email: 'generals@email.com',
            password: '1234567',
            gender: 'female'
        },
        beforeUpdateUser: {
            firstName: 'new first name',
            lastName: 'new last name',
            email: 'beforeupdate@email.com',
            password: '12345678',
            gender: 'male'
        },
        updateUser: {
            firstName: 'another first name',
            lastName: 'another last name',
            email: 'updated@email.com',
            oldPassword: '12345678',
            newPassword: '12345679',
            gender: 'female'
        }
    },
};