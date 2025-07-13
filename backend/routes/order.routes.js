const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller')
const authMiddleware = require('../middleware/auth.Middleware')

//Admin - Seller Features
router.get('/list', authMiddleware.getAdmin, orderController.getAllOrders)
router.get('/updatestatus', authMiddleware.getAdmin, orderController.updateStatus)

//Payment Features
router.post('/placeOrder', authMiddleware.getUser, orderController.placeOrder);
router.post('/razorpay', authMiddleware.getUser, orderController.placeOrder);

// user Features
router.get('/getorder', authMiddleware.getUser, orderController.getorderByUser)


module.exports = router;