var mongoose = require('mongoose');
const UserModel = require('../models/user.model');
const companyModel = require('../models/company.model');
var dbHelper = require('../helpers/db.helper');
var responseHelper = require('../helpers/response.helper');

//Simple version, without validation or sanitation
exports.create = async function (req, res, next) {
    try {
        let companyId = req.body.companyId ? req.body.companyId : null;
        //create Company If it doesnt exist for the user
        if (!companyId) {
            var companyDocument = new companyModel({
                companyName: req.body.companyName,
                companyEmail: req.body.username,
                companyEmail: req.body.phoneno
            });
            let newCompany = await companyDocument.save();
            companyId = newCompany._id;
        }
        //create User
        var userDocument = new UserModel({ ...req.body, companyId: companyId });
        let newUser = await userDocument.save();
        let responseobject = responseHelper.buildResponseObject(req.body, "200", "User created successfully!", newUser);
        res.json(responseobject);
    }
    catch (err) {
        res.json(responseHelper.buildResponseObject(req.body, "100", err.message, ""));
    }
};

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
