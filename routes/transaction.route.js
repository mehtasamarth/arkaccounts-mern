var express = require('express');
const transactionController = require('../controllers/transaction.controller');
var asyncHelper = require('../helpers/asyncMiddleware.helper');

const transactionRouter = express.Router();
transactionRouter.post('/purchase', transactionController.purchase);

module.exports = transactionRouter;