const { Router } = require('express');
const controller = require('../controllers/cart')
const passport = require('passport')
const router = Router();

router.post('/', passport.authenticate('jwt', {session: false}), controller.create)
router.get('/', passport.authenticate('jwt', {session: false}),  controller.getByUserId)
router.post('/:id', passport.authenticate('jwt', {session: false}),  controller.delete)

module.exports = router