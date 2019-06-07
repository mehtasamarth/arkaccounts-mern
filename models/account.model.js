var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
    accountName: {
        type: String,
        required: [true, "Account Name is required"]
    },
    userId: Schema.Types.ObjectId,
    companyId: Schema.Types.ObjectId,
    accountType:
    {
        type: String,
        enum: ["party", "expense", "cash"]
    },
    phoneno: String,
    addressLine1: String,
    addressLine2: String,
    pincode: String,
    state: String,
    gtin: String,
    acountBalance: Schema.Types.Double,
    createDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date, default: Date.now },
    createUser: String,
    modifiedUser: String
});

module.exports = mongoose.model('Account', AccountSchema);