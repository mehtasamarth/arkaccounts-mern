// server.js

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var cors = require('cors');
const path = require("path")


// Set up mongoose connection
const mongoose = require('mongoose');
// let dev_db_url = 'mongodb://arkaccountsadmin:arkaccountsadmin1@ds024748.mlab.com:24748/arkaccounts';
let dev_db_url = 'mongodb://localhost:27017/testsam';

const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port = process.env.PORT || 8000;        // set our port

// ROUTES FOR OUR API
var companyRouter = require('./routes/company.route');
var userRouter = require('./routes/user.route');
var productRouter = require('./routes/product.route');
var accountRouter = require('./routes/account.route');
var transactionRouter = require('./routes/transaction.route');

// REGISTER OUR ROUTES -------------------------------
app.use('/api/company', companyRouter);
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/account', accountRouter);
app.use('/api/transaction', transactionRouter);
app.use(express.static(path.join(__dirname, "client", "build")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);