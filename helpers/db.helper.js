var updateHelper = require('../helpers/update.helper');
var responseHelper = require('../helpers/response.helper');
exports.Save = save;


exports.DeleteByID = function (Model, req, res) {
    Model.findByIdAndDelete(req.body._id, function (err, company) {
        handleResponse(err,req,res,company);
    })
}

exports.GetAllByCondition = function (Model, req, res) {
    Model.find(req.body, function (err, company) {
        handleResponse(err,req,res,company);
    })
}

exports.UpdateById = function (Model, req, res) {
    Model.findById(req.body._id, function (err, company) {
        if (err) {
            responseobject = responseHelper.buildResponseObject(req.body, "100", err.message, "");
            res.send(responseobject);
        }
        else if (!company) {
            responseobject = responseHelper.buildResponseObject(req.body, "100", "Company Not Found", "");
            res.send(responseobject);
        }
        else {
            updateHelper.updateDocument(company, Model, req.body);
            save(company,req,res);
        }
    });
}


function save (document, req, res) {
    document.save(function (err, newDocument) {
        console.log(newDocument);
        if (err)
            responseobject = responseHelper.buildResponseObject(req.body, "100", err.message, "");
        else
            responseobject = responseHelper.buildResponseObject(req.body, "200", "Company created successfully!", newDocument);

        res.json(responseobject);
    });
};

function handleResponse(err,req,res,company) {
    if (err)
        responseobject = responseHelper.buildResponseObject(req.body, "100", err.message, "");
    else if (!company || (Array.isArray(company) && company.length === 0))
        responseobject = responseHelper.buildResponseObject(req.body, "100", "Object Not Found", "");
    else
        responseobject = responseHelper.buildResponseObject(req.body, "200", "Object Found", company);

    res.send(responseobject);
}



