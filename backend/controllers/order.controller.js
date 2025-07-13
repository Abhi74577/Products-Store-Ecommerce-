const cartModel = require('../models/cart.model');
const orderModel = require('../models/order.model')


// Placing Order using COD Method
module.exports.placeOrder = async (req, res, next) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        items.forEach(item => {
            cartModel.findByIdAndUpdate(item, { orderComplete: true })
        });

        res.status(200).json({message:"Order Placed"})
    } catch (error) {

    }
}

//Placing orders using RazorPay Method
module.exports.placeOrderRazorpay = async (req, res, next) => {

}

// Get User order
module.exports.getorderByUser = async (req, res, next) => {

}

//get All Order
module.exports.getAllOrders = async (req, res, next) => {

}

// Update Status
module.exports.updateStatus = async (req, res, next) => {

}