const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Cart = require('../models/Cart')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async (req, res) => {
    try {
        const candidate = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (candidate) {
            const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
            if (passwordResult) {
                const token = jwt.sign({
                    email: candidate.email,
                    userId: candidate.id
                }, 'dev-jwt', { expiresIn: 60 * 60 * 10});
    
                res.status(201).json({
                    token: `Bearer ${token}`
                })
            } else {
                res.status(404).json({
                    message: "The password is wrong!"
                })
            }
        } else {
            res.status(404).json({
                message: "This email doesn't exist!"
            })
        }
    } catch (error) {
        errorHandler(res, error)
    }
   
}

module.exports.registration = async (req, res) => {
    try {
        const candidate = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        if (candidate) {
            res.status(404).json({
                message: "This email already exists!"
            })
        } else {

            const salt = bcrypt.genSaltSync(10);
            const password = req.body.password;
            const user = await User.create({
                password: bcrypt.hashSync(password, salt),
                email: req.body.email
            })      
            await Cart.create({
                user_id: user.id,
                price: 0,
                items: []
            })
            res.status(200).json({
                user,
                message: "You are successfuly registered and you can login!"
            })
        }
    } catch (error) {
        errorHandler(res, error)
    }
}