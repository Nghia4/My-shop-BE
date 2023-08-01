const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/ProductController/ProductController');
const { authMiddlewares } = require("../middlewares/authMiddleware");

router.post('/create', ProductController.createProduct )
router.put('/update-product/:id', authMiddlewares , ProductController.updateProduct)
router.get('/detail-product/:id',ProductController.getProductDetail)
router.get('/getAll', ProductController.getAllProducts)
router.delete('/delete-product/:id',authMiddlewares, ProductController.deleteProduct)
router.post('/delete-many',authMiddlewares, ProductController.deleteManyProduct)
router.get('/get-all-type', ProductController.getAllType)
// router.post('/refresh-token', refreshToken )

module.exports = router