var mongoose = require('mongoose');
const CompanyModel = require('../models/company.model');
var dbHelper = require('../helpers/db.helper');

//Simple version, without validation or sanitation
exports.create = function (req, res) {

    var company = new CompanyModel(req.body);
    // save the company and check for errors
    dbHelper.Save(company, req, res);
};

exports.updateById = function (req, res) {
    dbHelper.UpdateById(CompanyModel, req, res);
}

exports.deleteById = function (req, res) {
    dbHelper.DeleteByID(CompanyModel, req, res);
};

exports.get = function (req, res) {
    dbHelper.GetAllByCondition(CompanyModel, req, res);
};