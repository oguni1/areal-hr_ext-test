module.exports = (sequelize, Sequelize) => {
  const Personnel = sequelize.define("personnel", {
    employee_id: {
      type: Sequelize.INTEGER
    },
    department_id: {
      type: Sequelize.INTEGER
    },
    role_id: {
      type: Sequelize.INTEGER
    },
    salary: {
      type: Sequelize.INTEGER
    },
    action: {
      type: Sequelize.STRING
    }
  });

  return Personnel;
};