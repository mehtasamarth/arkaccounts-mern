var express = require('express');
const productController = require('../controllers/product.controller');

const productRouter = express.Router();
productRouter.post('/create',productController.create);
productRouter.post('/updateById', productController.updateById);
productRouter.post('/deleteById', productController.deleteById);
productRouter.post('/get', productController.get);

module.exports = productRouter;