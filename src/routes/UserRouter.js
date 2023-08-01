const express = require("express");
const router = express.Router();
const userController = require('../controllers/UserController/UserController');
const { authMiddlewares, authUserMiddlewares } = require("../middlewares/authMiddleware");
const { refreshToken } = require("../utils");

router.post('/sign-up', userController.createUser )
router.post('/sign-in', userController.loginUser)
router.post('/log-out', userController.logoutUser)
router.put('/update-user/:id',authUserMiddlewares, userController.updateUser)
router.delete('/delete-user/:id', authMiddlewares , userController.deleteUser)
router.get('/getAll', authMiddlewares , userController.getAllUsers)
router.get('/getUser-detail/:id', authUserMiddlewares , userController.getUserDetail)
router.post('/refresh-token', refreshToken )
router.post('/delete-many',authMiddlewares, userController.deleteManyUser)

module.exports = router