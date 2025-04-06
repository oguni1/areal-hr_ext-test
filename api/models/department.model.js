module.exports = (sequelize, Sequelize) => {
  const Department = sequelize.define("department", {
    organization_id: {
      type: Sequelize.INTEGER
    },
    department_id: {
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    comment: {
      type: Sequelize.STRING
    }
  });

  return Department;
};