const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {type: String, require: true},
    description: {type: String, require: true},
    price: {type: Number, require: true},
    image: {type: Array, require: false},
    category: {type: String, require: true},
    subCategory: {type: String, require: true},
    sizes: {type: Array, require: true},
    bestseller: {type: Boolean, default: false},
    date: {type: Number, require: true},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
    },
})

const productModel = mongoose.model('product', productSchema);

module.exports = productModel;