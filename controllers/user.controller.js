var mongoose = require('mongoose');
const UserModel = require('../models/user.model');
const companyModel = require('../models/company.model');
var dbHelper = require('../helpers/db.helper');
var responseHelper = require('../helpers/response.helper');

//Simple version, without validation or sanitation
exports.create = function (req, res) {

    if (!req.body.companyId) {
        var companyDocument = new companyModel({
            companyName: req.body.companyName,
            companyEmail: req.body.username
        });

        companyDocument.save(function (err, newDocument) {
            if (err) {
                responseobject = responseHelper.buildResponseObject(req.body, "100", err.message, "");
                res.json(responseobject);
                return;
            }
            createUser(req, res, newDocument._id);
        });
    }
    else {
        createUser(req, res, req.body.companyId)
    }
};

createUser = (req, res, companyId) => {

    var document = new UserModel({ ...req.body, companyId: companyId });
    // save the document and check for errors
    dbHelper.Save(document, req, res);
}

exports.updateById = function (req, res) {
    dbHelper.UpdateById(UserModel, req, res);
}

exports.deleteById = function (req, res) {
    dbHelper.DeleteByID(UserModel, req, res);
};

exports.get = function (req, res) {
    dbHelper.GetAllByCondition(UserModel, req, res);
}

exports.login = function (req, res) {
    UserModel.findOne(req.body, function (err, user) {
        let responseObject = {};
        // if (err) return next(err);
        if (!user) {
            responseobject = responseHelper.buildResponseObject(req.body, "100", "Login Failed", "");
        }
        else {
            //To Do: Add logic to save Token here
            responseobject = responseHelper.buildResponseObject(req.body, "200", "Login Successful", user);
        }
        // console.log(responseobject);
        res.send(responseobject);
    })
};
