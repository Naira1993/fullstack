const sequelize = require('../utils/database');
const { Sequelize, DataTypes } = require('sequelize')

const Watch = sequelize.define('watches', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1
    },
    user_email: DataTypes.STRING,
    title: DataTypes.STRING,
    model: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING,
    like: {
        type: DataTypes.TEXT,
        get: function () {
            return JSON.parse(this.getDataValue('like'));
        },
        set: function (val) {
            return this.setDataValue('like', JSON.stringify(val));
        }
    }
})

module.exports = Watch
