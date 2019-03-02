exports.buildResponseObject = function (req, resCode, resMessage, resData) {
    var responseObject = { request: "", responseMessage: "", responseData: "", responseCode: "" };
    
    responseObject.request = req;
    responseObject.responseCode = resCode;
    responseObject.responseMessage = resMessage;
    responseObject.responseData = resData;
    
    return responseObject;
};

exports.handleErrorResponse = function (req,res,err){
    if (err.name === 'MongoError' && err.code === 11000) {
        responseobject = this.buildResponseObject(req.body, "100", "Duplicate Record Found", "");
    }
    else
    {
        responseobject = this.buildResponseObject(req.body, "100", err.message, "");
    }
    res.send(responseobject);
}

