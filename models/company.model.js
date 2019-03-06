var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanySchema = new Schema({
    companyName: {
        type: String,
        required: [true, "Company Name Is Required"]
    },
    contactName: String,
    userId: Schema.Types.ObjectId,
    companyEmail: {
        type: String,
        required: [true, "username is required"],
        unique: true,
        dropDups: true
    },
    companyPhoneNo: String,
    addressLine1: String,
    pincode: String,
    state: String,
    gtin: String,
    pan: String,
    purchaseDue: {
        type: Number,
        default: 0
    },
    salesDue: {
        type: Number,
        default: 0
    },
    companyPolicy: String,
    bankAccountNumber: String,
    bankAccountName: String,
    bankName: String,
    bankBranch: String,
    bankIfscCode: String,
    // Subscription Fields
    subscriptionId: Schema.Types.ObjectId,
    subscriptionStartDate: Date,
    subscriptionEndDate: Date,
    allowedUsers: Number,
    // Audit Fields
    createDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date, default: Date.now },
    createUser: String,
    modifiedUser: String
});

module.exports = mongoose.model('Company', CompanySchema);