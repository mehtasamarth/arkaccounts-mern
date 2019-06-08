var mongoose = require('mongoose');
const Account = require('../models/account.model');
const Transaction = require('../models/transaction.model');
var dbHelper = require('../helpers/db.helper');
var responseHelper = require('../helpers/response.helper');

//Simple version, without validation or sanitation
exports.create = async function (req, res, next) {
    try {
        //Create Account
        var document = new Account(req.body);
        let newAccount = await document.save();

        var transaction = new Transaction(req.body);
        transaction.description = "Opening Balance";
        transaction.total = Math.abs(req.body.acountBalance);
        transaction.balanceAmount = transaction.total;
        transaction.accountId = newAccount._id;
        transaction.companyId = req.body.companyId;
        transaction.accountName = req.body.accountName;
        transaction.transactionType = req.body.isDebit ? "debit" : "credit";
        transaction.isCompleted = false;

        let newTransaction = await transaction.save();
        let responseobject = responseHelper.buildResponseObject(req.body, "200", "Account created successfully!", newAccount);
        res.json(responseobject);
    }
    catch (err) {
        res.json(responseHelper.buildResponseObject(req.body, "100", err.message, ""));
    }
};

exports.updateById = function (req, res) {
    dbHelper.UpdateById(Account, req, res);
}

exports.deleteById = function (req, res) {
    dbHelper.DeleteByID(Account, req, res);
};

exports.get = function (req, res) {
    dbHelper.GetAllByCondition(Account, req, res);
};