const Order = require('../models/Order')
const Cart = require('../models/Cart')
const errorHandler = require('../utils/errorHandler')

module.exports.create = async (req, res) => {
    try {
        await Order.create({
            user_id: req.user.id,
            price: req.body.price,
            cart: req.body.items
        });
        await Cart.update({
            items: [],
            price: 0
        }, {
            where: {
                user_id: req.user.id
            }
        }
        )
        res.status(200).json({
            message: "Created!"
        })
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.getByUserId = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: {
                user_id: req.user.id
            }
        })
        res.status(201).json({
            orders
        })
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.delete = async (req, res) => {
    try {
        await Order.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(201).json({
            message: "Deleted"
        })
    } catch (error) {
        errorHandler(res, error)
    }
}