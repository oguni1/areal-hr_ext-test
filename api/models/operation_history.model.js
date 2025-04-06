module.exports = (sequelize, Sequelize) => {
  const History = sequelize.define("history", {
    operation_id: {
      type: Sequelize.INTEGER
    },
    date: {
      type: Sequelize.DATE
    },
    changed_by: {
      type: Sequelize.STRING
    },
    operation_object_id: {
      type: Sequelize.INTEGER
    },
    changed_fields: {
      type: Sequelize.STRING
    }
  });

  return History;
};