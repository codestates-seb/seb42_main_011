module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    nickname: {
      type: Sequelize.STRING
    },
    dogName: {
      type: Sequelize.STRING
    },
    dogGender: {
      type: Sequelize.STRING
    }
  });

  return User;
};