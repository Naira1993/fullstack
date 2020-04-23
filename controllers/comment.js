const Comment = require('../models/Comment')
const errorHandler = require('../utils/errorHandler')


module.exports.create = async (req, res) => {
    try {
        const comment = await Comment.create({
            user_email: req.body.user_email,
            watch_id: req.body.watch_id,
            text: req.body.text,
            like: [],
            dislike: []
        });
        res.status(201).json({
            comment
        })
    } catch (error) {
        errorHandler(res, error)
    }

}

module.exports.getByWatchId = async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: {
                watch_id: req.params.watch_id
            }
        }
        )
        res.status(201).json({
            comments
        })
    } catch (error) {
        errorHandler(res, error)
    }

}

module.exports.getById = async (req, res) => {
    try {
        const comment = await Comment.findAll({
            where: {
                id: req.params.id
            }
        }
        )
        res.status(201).json({
            comment
        })
    } catch (error) {
        errorHandler(res, error)
    }

}


module.exports.update = async (req, res) => {
    try {
        const id = req.params.id;

        await Comment.update({
            like: req.body.like,
            dislike: req.body.dislike
        }, {
            where: {
                id
            }
        })

        res.status(201).json({
            // comment
        })
    } catch (error) {
        errorHandler(res, error)
    }
}


module.exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        await Comment.findOne({
            where: {
                id
            }
        }).then(async comment => {
            if (comment.user_email === req.user.email) {
                await Comment.destroy({
                    where: {
                        id: 1,
                        user_email: req.body.email
                    }
                }
                )
            } else {
                res.status(403).json({
                    success: false,
                    message: "You didn't add this watch"
                })
            }

        })

        res.status(201).json({
            message: 'Deleted successfully'
        })
    } catch (error) {
        errorHandler(res, error)
    }

}
