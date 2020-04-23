const { Router } = require('express');
const passport = require('passport')
const controller = require('../controllers/order')
const router = Router();

router.post('/',   passport.authenticate('jwt', {session: false}), controller.create)
router.get('/',  passport.authenticate('jwt', {session: false}), controller.getByUserId)
router.delete('/:id',  passport.authenticate('jwt', {session: false}), controller.delete)

module.exports = router