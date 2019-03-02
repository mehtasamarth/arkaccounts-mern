var mongoose = require('mongoose');
const Account = require('../models/account.model');
var dbHelper = require('../helpers/db.helper');

//Simple version, without validation or sanitation
exports.create = function (req, res) {

    var company = new Account(req.body);
    // save the company and check for errors
    dbHelper.Save(company, req, res);
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