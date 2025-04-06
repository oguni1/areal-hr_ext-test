module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define("employee", {
    last_name: {
      type: Sequelize.STRING
    },
    first_name: {
       type: Sequelize.STRING
    },
    patronym: {
       type: Sequelize.STRING
    },
    birth_date: {
      type: Sequelize.DATEONLY
    },
    passport: {
      type: Sequelize.INTEGER
    },
    registration: {
      type: Sequelize.INTEGER
    },
    scan: {
      type: Sequelize.INTEGER
    }
  });

  return Employee;
};