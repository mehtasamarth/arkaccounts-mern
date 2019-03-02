var mongoose = require('mongoose');
const ProductModel = require('../models/product.model');
var dbHelper = require('../helpers/db.helper');

//Simple version, without validation or sanitation
exports.create = function (req, res) {

    var document = new ProductModel(req.body);
    // save the document and check for errors
    dbHelper.Save(document, req, res);
};

exports.updateById = function (req, res) {
    dbHelper.UpdateById(ProductModel, req, res);
}

exports.deleteById = function (req, res) {
    dbHelper.DeleteByID(ProductModel, req, res);
};

exports.get = function (req, res) {
    dbHelper.GetAllByCondition(ProductModel, req, res);
}