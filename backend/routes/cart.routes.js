const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.Middleware')
const cartController = require('../controllers/cart.controller')


router.post('/addcart', authMiddleware.getUser, cartController.addCart);
router.get('/getCart', authMiddleware.getUser, cartController.getCartByUser);

router.get('/updatesize', authMiddleware.getUser, cartController.updateSize);
router.get('/delteItem', authMiddleware.getUser, cartController.deleteItem);

module.exports = router;