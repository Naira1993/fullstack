const sequelize = require('../utils/database');
const { Sequelize, DataTypes } = require('sequelize')
const Comment = sequelize.define('comments', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1
    },
    user_email: DataTypes.STRING,
    watch_id: DataTypes.INTEGER,
    text: DataTypes.TEXT,

    like: {
        type: DataTypes.TEXT,
        get: function () {
            return JSON.parse(this.getDataValue('like'));
        },
        set: function (val) {
            return this.setDataValue('like', JSON.stringify(val));
        }
    },
    dislike: {
        type: DataTypes.TEXT,
        get: function () {
            return JSON.parse(this.getDataValue('dislike'));
        },
        set: function (val) {
            return this.setDataValue('dislike', JSON.stringify(val));
        }
    }
})

module.exports = Comment
