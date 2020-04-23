const sequelize = require('../utils/database');
const { Sequelize, DataTypes } = require('sequelize')
const Order = sequelize.define('order', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1
    },
    user_id: DataTypes.STRING,
    price: DataTypes.INTEGER,
    cart: {
        type: DataTypes.TEXT,
        get: function () {
            return JSON.parse(this.getDataValue('cart'));
        },
        set: function (val) {
            return this.setDataValue('cart', JSON.stringify(val));
        }
    }
})

module.exports = Order