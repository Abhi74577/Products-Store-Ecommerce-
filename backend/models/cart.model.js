const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        require: true
    },
    size:{
        type:String,
        require: true
    },
    sizeTotal:{
        type:Number,
        require: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    date: {type: Number, require: true},
});

const cartModel = mongoose.model('chart', cartSchema);

module.exports = cartModel