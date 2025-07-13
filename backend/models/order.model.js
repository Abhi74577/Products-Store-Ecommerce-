const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    items: {
        type: Array,
        require: true
    },
    amount: { type: Number, require: true },
    address: { type: Object, require: true },
    status: { type: String, require: true, default: 'Order Placed' },
    paymentMethod: { type: String, require: true },
    payment: { type: Boolean, require: true },
    date: { type: Number, require: true }


});

const orderModel = mongoose.model('order', orderSchema);

module.exports = orderModel;