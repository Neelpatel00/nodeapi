const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productname: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Product = mongoose.model('Product',productSchema);
module.exports = Product;