var express = require('express');
const transactionController = require('../controllers/transaction.controller');

const transactionRouter = express.Router();
transactionRouter.post('/purchase', transactionController.purchase);

module.exports = transactionRouter;