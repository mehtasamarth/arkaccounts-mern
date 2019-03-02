var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    productname: {
        type: String,
        required: true
    },
    companyId: Schema.Types.ObjectId,
    productDescription: String,
    productHSN: String,
    unitPrice: Schema.Types.Decimal128, 
    taxAmount: Schema.Types.Decimal128,
    cgst: Schema.Types.Decimal128,
    sgst: Schema.Types.Decimal128,
    igst: Schema.Types.Decimal128,
    stock: Schema.Types.Decimal128,
    createDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date, default: Date.now },
    createUser: String,
    modifiedUser: String
});

module.exports = mongoose.model('Product', ProductSchema);