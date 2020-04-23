const { Router } = require('express');
const passport = require('passport')
const upload = require('../middleware/upload')
const controller = require('../controllers/watch')
const router = Router();

router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.create)
router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.update)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.delete)

module.exports = router