const sequelize = require('../utils/database')
const { Sequelize,  DataTypes } = require('sequelize')

const User = sequelize.define('users', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1
    },
    email: DataTypes.STRING,
    password:  DataTypes.STRING
}
);

module.exports = User