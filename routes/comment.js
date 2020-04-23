const { Router } = require('express');
const passport = require('passport')
const controller = require('../controllers/comment')
const router = Router();

router.post('/', passport.authenticate('jwt', {session: false}), controller.create)
router.post('/:watch_id', passport.authenticate('jwt', {session: false}), controller.getByWatchId)
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById)
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.update)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.delete)

module.exports = router