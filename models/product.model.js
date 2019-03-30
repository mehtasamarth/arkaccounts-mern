var mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    companyId: Schema.Types.ObjectId,
    productDescription: String,
    productHSN: String,
    uom: String,
    cgst: Schema.Types.Double,
    sgst: Schema.Types.Double,
    igst: Schema.Types.Double,
    unitPrice: Schema.Types.Double, 
    taxAmount: Schema.Types.Double,
    totalAmount: Schema.Types.Double,
    stock: Schema.Types.Double,
    createDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date, default: Date.now },
    createUser: String,
    modifiedUser: String
});

module.exports = mongoose.model('Product', ProductSchema);