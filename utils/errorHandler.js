module.exports = (res, error) => {
    res.status(500).json({
        success: false,
        messege: error.message ? error.message : error
    })
}