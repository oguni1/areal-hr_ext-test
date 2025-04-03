module.exports = (sequelize, Sequelize) => {
  const Organization = sequelize.define("organization", {
    name: {
      type: Sequelize.STRING
    },
    comment: {
      type: Sequelize.STRING
    }
  });

  return Tutorial;
};