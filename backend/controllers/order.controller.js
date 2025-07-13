const cartModel = require('../models/cart.model');
const orderModel = require('../models/order.model')


// Placing Order using COD Method
module.exports.placeOrder = async (req, res, next) => {
    try {
        const { items, amount, address } = req.body;

        const userData = req.user

        const orderData = {
            userId: userData._id,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()
        console.log(items)

        await Promise.all(items.map(async item => {
            const cartdata = await cartModel.findById(item._id);
            console.log(cartdata);

            // if (!cartdata || cartdata.orderComplete) return;

            await cartModel.findByIdAndUpdate(item._id, { orderComplete: true });
        }));



        res.status(200).json({ message: "Order Placed" })
    } catch (error) {
        return res.status(400).json({ message: error })
    }
}

//Placing orders using RazorPay Method
module.exports.placeOrderRazorpay = async (req, res, next) => {

}

// Get User order
module.exports.getorderByUser = async (req, res, next) => {
    try {
        const user = req.user;
        const orderfullData = [];

        const orders = await orderModel.find({ userId: user._id });

        await Promise.all(orders.map(async (order) => {
            const cartItemsData = [];

            await Promise.all(order.items.map(async (cartItem) => {
                const cartdata = await cartModel.findById(cartItem._id);
                if (cartdata) {
                    cartItemsData.push(cartdata);
                }
            }));

            orderfullData.push({
                _id: order._id,
                address: order.address,
                amount: order.amount,
                date: order.date,
                payment: order.payment,
                paymentMethod: order.paymentMethod,
                status: order.status,
                cartItemsData: cartItemsData
            });
        }));

        res.status(200).json({
            orders: orderfullData,
            message: "Orders fetched successfully."
        });

    } catch (error) {
        return res.status(400).json({ message: error })
    }



}

//get All Order
module.exports.getAllOrders = async (req, res, next) => {

}

// Update Status
module.exports.updateStatus = async (req, res, next) => {

}