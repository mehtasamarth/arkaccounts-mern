var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransactionDetailSchema = new Schema({
    productno: String,
    productName: String,
    hsnCode: String,
    cgst: Number,
    sgst: Number,
    igst: Number,
    quantity: Number,
    linetax: Number,
    linetotal: Number,
});

var TransactionSchema = new Schema({
    accountId: {
        type: Schema.Types.ObjectId,
        required: [true, "Account ID is required"]
    },
    companyId: {
        type: Schema.Types.ObjectId,
        required: [true, "Company ID is required"]
    },
    accountName: {
        type: String,
        required: [true, "Account Name is required"]
    },
    transactionDetails: [TransactionDetailSchema],
    tax:
    {
        type: Number,
        default: 0
    },
    total:
    {
        type: Number,
        default: 0
    },
    balanceAmount:
    {
        type: Number,
        default: 0
    },
    accountRunningBalance: Number,
    isCompleted: Boolean,
    transactionType:
    {
        type: String,
        enum: ["debit", "credit"],
    },
    addressLine1: String,
    addressLine2: String,
    pincode: String,
    state: String,
    gtin: String,
    createDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date, default: Date.now },
    createUser: String,
    modifiedUser: String
});

module.exports = mongoose.model('Transaction', TransactionSchema);