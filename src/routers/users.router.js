const { Router } = require('express')
const { verifyToken } = require('../middlewares/auth.middlewares')
const { getUser, newUser, updateUser, deleteUser, activeAcount } = require('../controllers/user.controllers')
const { mesagge } = require('../mqtt/message')

const router = Router()

router.get('/users/:id', verifyToken, getUser)
router.post('/users', newUser)
router.put('/users/:id', verifyToken, updateUser)
router.delete('/users/:id', verifyToken, deleteUser)
router.patch('/users/:id/active', verifyToken, activeAcount)
router.post('/messages/send/:id', verifyToken, mesagge)

module.exports = router;