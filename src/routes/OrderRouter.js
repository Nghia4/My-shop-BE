const express = require("express");
const router = express.Router();
const OrderController = require('../controllers/OrderController/OrderController');
const { authUserMiddlewares, authMiddlewares } = require("../middlewares/authMiddleware");

router.post('/create',authUserMiddlewares, OrderController.createOrder )
router.get('/get-details-order/:id', authUserMiddlewares, OrderController.getDetailOrder)
router.get('/get-my-details-order/:id', authUserMiddlewares, OrderController.getMyDetailOrder)
router.delete('/delete-order/:id', authUserMiddlewares, OrderController.deleteOrder)
router.get('/get-all-order', authMiddlewares, OrderController.getAllOrder)

module.exports = router