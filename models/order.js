const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    details:[
        {
            productname: {type: String},
            discription: {type: String},
            price: {type: Number}
        }
    ]
    
}, { timestamps: true });

const Order = mongoose.model('Order',orderSchema);
module.exports = Order;