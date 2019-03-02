var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "username is required"]
    },
    firstName: String,
    lastName: String,
    companyId: Schema.Types.ObjectId,
    password: String,
    phoneno: String,
    isActive: {
        type: Boolean,
        default: true
    },
    isAdmin: {
        type: Boolean,
        default: true
    },
    token: String,
    expirationDate: Date,
    createDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date, default: Date.now },
    createUser: String,
    modifiedUser: String
});

module.exports = mongoose.model('User', UserSchema);