var express = require('express');
const accountController = require('../controllers/account.controller');

const accountRouter = express.Router();
accountRouter.post('/create',accountController.create);
accountRouter.post('/updateById', accountController.updateById);
accountRouter.post('/deleteById', accountController.deleteById);
accountRouter.post('/get', accountController.get);


module.exports = accountRouter;