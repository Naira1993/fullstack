const sequelize = require('../utils/database');
const { Sequelize, DataTypes } = require('sequelize')
const Cart = sequelize.define('cart', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1
    },
    user_id: DataTypes.STRING,
    price: DataTypes.INTEGER,
    items: {
        type: DataTypes.TEXT,
        get: function () {
            return JSON.parse(this.getDataValue('items'));
        },
        set: function (val) {
            return this.setDataValue('items', JSON.stringify(val));
        }
    }
})
module.exports = Cart
