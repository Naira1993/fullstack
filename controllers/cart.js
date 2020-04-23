const Cart = require('../models/Cart')
const errorHandler = require('../utils/errorHandler')

module.exports.create = async (req, res) => {
    try {   
        const cartItem = await Cart.findAll({
            where: {
                user_id: req.user.id
            }
        })
        let watches = JSON.parse(cartItem[0].dataValues.items);
        const index = watches.findIndex(c => c.id === req.body.id);
        const price = cartItem[0].dataValues.price + req.body.price;
    
        if (index === -1) {
            const watch = req.body;
            watch.count = 1;
            watches.push(watch),
            console.log(watches);
                await Cart.update({
                    items: watches,
                    price
                }, {
                    where: {
                        user_id: req.user.id
                    }
                })
        } else {
            watches[index].count += 1    
            await Cart.update({
                items: watches,
                price
            }, {
                where: {
                    user_id: req.user.id
                }
            })
        }
        res.status(200).json({
            message: "Updated!"
        })
    } catch (error) {
       errorHandler(res, error)
    } 
}

module.exports.getByUserId = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            where: {
                user_id: req.user.id
            }
        })

        if(cart) {
            res.status(201).json({
                cart
             }) 
        } else {
            res.status(200).json({
                cart: []
            })
        }
    } catch (error) {
       errorHandler(res, error)
    }

}

module.exports.delete = async (req, res) => {
    try {
        const cartItem = await Cart.findAll({
            where: {
                user_id: req.user.id
            }
        })
        let watches = JSON.parse(cartItem[0].dataValues.items);
        const index = watches.findIndex(c => c.id === req.params.id);
        const price = cartItem[0].dataValues.price - req.body.price;
    
        if (watches[index].count > 1) {
            watches[index].count-=1
            console.log(watches);
                await Cart.update({
                    items: watches,
                    price
                }, {
                    where: {
                        user_id: req.user.id
                    }
                })
        } else {
           watches.splice(index, 1);  
            await Cart.update({
                items: watches,
                price
            }, {
                where: {
                    user_id: req.user.id
                }
            })
        }
        res.status(200).json({
            message: "Deleted!"
        })
    } catch (error) {
       errorHandler(res, error)
    } 
}