var express = require('express');
const userController = require('../controllers/user.controller');

const userRouter = express.Router();
userRouter.post('/create',userController.create);
userRouter.post('/updateById', userController.updateById);
userRouter.post('/delete', userController.deleteById);
userRouter.post('/login', userController.login);
userRouter.post('/get', userController.get);


module.exports = userRouter;