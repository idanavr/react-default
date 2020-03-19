const initModels = function initModels() {
  require('./user');
};

const roleEnum = {
  Normal: 'normal',
  Admin: 'admin',
};

const genders = ['male', 'female'];

const roles = Object.values(roleEnum);

module.exports = { initModels, roleEnum, roles, genders };