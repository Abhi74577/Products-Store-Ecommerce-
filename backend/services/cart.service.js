const cartModel = require('../models/cart.model')


module.exports.add = async ({ productId, size, sizeTotal, userId, date, orderComplete}) => {
    if (!productId || !size || !userId || !date || !sizeTotal) {
        throw new Error("All filed required.");

    }

    const data = cartModel.create({
        productId, size, sizeTotal, userId, date, orderComplete
    });

    return data
}

module.exports.getbyuser = async (userId) => {

    if (!userId) {
        throw new Error("error in get cart.");

    }
    const data = cartModel.find({ userId: userId})

    return data;
}

module.exports.update = async (cartId, btnNb) => {
    console.log(cartId, btnNb)
    const data = await cartModel.findById(cartId);

    if (data) {
        console.log('update', data)
        const cartData = await cartModel.findByIdAndUpdate(data._id, { sizeTotal: btnNb });
        console.log(cartData)
        // const cartData = btnType == 'increase' ?
        //     await cartModel.findByIdAndUpdate(data._id, { sizeTotal: data.sizeTotal + 1 }) :
        //     await cartModel.findByIdAndUpdate(data._id, { sizeTotal: data.sizeTotal - 1 })

        return cartData


    }
}

module.exports.deleteItem = async (cartId) => {

    const cartData = await cartModel.findByIdAndDelete(cartId);



    return cartData


}