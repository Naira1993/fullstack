const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-watches', 'root', 'yuri2019', {
    host: 'localhost',
    dialect:'mysql'
  });

  module.exports = sequelize