const express = require('express')
const router = express.Router();
const userController = require('../controllers/userAuth.controller')
const authMiddleware = require('../middleware/auth.Middleware')

router.post('/register', userController.userRegistration);
router.post('/login', userController.useerLogin) ;

router.get('/profile', authMiddleware.getUser, userController.getUserProfile)
router.get('/logout', userController.Logout)

module.exports = router;