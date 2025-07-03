const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminAuth.controller');
const authMiddleware = require('../middleware/auth.Middleware')


router.post('/register', adminController.adminRegistration);
router.post('/login', adminController.adminLogin)

router.get('/profile', authMiddleware.getAdmin, adminController.getProfile)
router.get('/logout', adminController.Logout)

module.exports = router;