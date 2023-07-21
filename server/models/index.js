const mongoose = require("mongoose");
mongoose.set("debug", true);

mongoose.connect(process.env.MONGODB_URI);

module.exports.User = require("./user");
module.exports.Product = require("./product");
