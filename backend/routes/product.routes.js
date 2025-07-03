const express = require('express');

const router = express.Router();
const authMiddleware = require('../middleware/auth.Middleware');
const productController = require('../controllers/product.controller');
const upload  = require('../middleware/multer')

router.post('/addproduct', upload.fields([{name:'image1', maxCount:1}, {name:'image2', maxCount:1}, {name:'image3', maxCount:1}, {name:'image4', maxCount:1}]) ,authMiddleware.getAdmin, productController.addProduct);
router.get('/getallproduct', authMiddleware.getAdmin, productController.listOfProducts);
router.get('/getproductbyId', authMiddleware.getAdmin, productController.getProductById);
router.get('/removeproductbyId', authMiddleware.getAdmin, productController.removeProduct);
router.post('/updateproduct', authMiddleware.getAdmin, productController.updateProduct);


module.exports = router;