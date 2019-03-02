var mongoose = require('mongoose');
const TransactionModel = require('../models/transaction.model');
const AccountModel = require('../models/account.model');

var responseHelper = require('../helpers/response.helper');

//Simple version, without validation or sanitation
exports.purchase = async function (req, res, next) {
    try {
        // Original Transaction
        var transaction = new TransactionModel(req.body);
        transaction.transactionType = "debit";
        transaction.balanceAmount = transaction.total;

        //Find Credit Account for Purchase & Sale
        
        // Credit Transaction for Purchase Account  
        var creditTransaction = new TransactionModel(req.body);
        creditTransaction.accountName = "Purchase";
        creditTransaction.isCompleted = true;
        creditTransaction.transactionType = "credit";
        creditTransaction.transactionDetails = [];
        console.log("Transaction =", transaction);
        console.log("CreditTransaction =", creditTransaction);

        let returnTransaction = await TransactionModel.create(transaction,creditTransaction);
        responseobject = responseHelper.buildResponseObject(req.body, "200", "Company Found", returnTransaction[0]);
        res.send(responseobject);
    }
    catch (err) {
        responseHelper.handleErrorResponse(req,res,err);
    }
};