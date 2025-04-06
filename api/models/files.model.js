module.exports = (sequelize, Sequelize) => {
  const Files = sequelize.define("files", {
    name: {
      type: Sequelize.STRING
    },
    file: {
      type: Sequelize.BLOB
    }
  });

  return Files;
};