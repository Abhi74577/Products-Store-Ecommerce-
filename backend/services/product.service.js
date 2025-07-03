const productModel = require('../models/product.model')


module.exports.createProduct = async ({ name, description, price, image, category, subCategory, sizes, bestseller, date, userId }) => {


    if (!name || !description || !price || image.length == 0 || !category || !subCategory || sizes.length == 0 || !date || !userId) {
        throw new Error("All fields are required");

    }

    console.log('insert')
    const product = await productModel.create({
        name,
        description,
        price,
        image,
        category,
        subCategory,
        sizes,
        bestseller,
        date,
        userId
    })

    return product;
}

module.exports.getProduct = async (userId) => {

    const product = await productModel.find({ userId: userId })
    return product
}

module.exports.getProductById = async (productId) => {
    const product = await productModel.findById({ _id: productId })
    return product
}

module.exports.removeProduct = async (productId) => {
    const data = await productModel.findByIdAndDelete(productId)
    return data
}

// module.exports.updateProduct = async (id) => {
//     cons
// }