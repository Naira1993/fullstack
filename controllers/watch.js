const Watch = require('../models/Watch')
const errorHandler = require('../utils/errorHandler')

module.exports.create = async (req, res) => {
    try {
        console.log(req.file);

        await Watch.create({
            title: req.body.title,
            model: req.body.model,
            price: req.body.price,
            user_email: req.user.email,
            like: [],
            image: req.file ? req.file.path : ''
        })
    } catch (error) {
        errorHandler(res, error)
    }

}

module.exports.getAll = async (req, res) => {
    try {
        const watches = await Watch.findAll();
        res.status(201).json({
            watches
        })
    } catch (error) {
        errorHandler(res, error)
    }

}

module.exports.getById = async (req, res) => {
    try {
        const watch = await Watch.findOne({
            where: {
                id: req.params.id
            }
        });

        res.status(201).json({
            watch
        })
    } catch (error) {
        errorHandler | (res, error)
    }
}

module.exports.update = async (req, res) => {
    try {
      const watch = await Watch.findOne({
            where: {
                id: req.params.id
            }
        }).then(watch => {
            watch.update({
                title: req.body.title,
                model: req.body.model,
                price: req.body.price,
                user_email: req.user.email,
                like: req.body.like,
                image: req.file ? req.file.path : watch.image
            })
        })

    } catch (error) {
        errorHandler(res, error)
    }

}

module.exports.delete = async (req, res) => {
    try {
        await Watch.findOne({
            where: {
                id: req.params.id
            }
        }).then(async watch => {
            if (watch.email === req.user.email) {
                await Watch.destroy({
                    where: {
                        id: req.params.id
                    }
                })
            } else {
                res.status(403).json({
                    success: false,
                    message: "You didn't add this watch"
                })
            }
        })

    } catch (error) {
        errorHandler(res, error)
    }
}