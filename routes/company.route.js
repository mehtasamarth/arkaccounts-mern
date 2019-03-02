var express = require('express');
const companyController = require('../controllers/company.controller');

const companyRouter = express.Router();
companyRouter.post('/create',companyController.create);
companyRouter.post('/updateById', companyController.updateById);
companyRouter.post('/deleteById', companyController.deleteById);
companyRouter.post('/get', companyController.get);


module.exports = companyRouter;