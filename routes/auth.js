const { Router } = require('express');
const controller = require('../controllers/auth')
const router = Router()

router.post('/login', controller.login)
router.post('/registration', controller.registration)

module.exports = router