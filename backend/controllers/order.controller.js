const cartModel = require('../models/cart.model');
const orderModel = require('../models/order.model')
const productModel = require('../models/product.model')
const razorpay = require('razorpay')

// global variable

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})
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
    try {
        const { items, amount, address } = req.body;

        const userData = req.user

        const orderData = {
            userId: userData._id,
            items,
            address,
            amount,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()


        await Promise.all(items.map(async item => {
            const cartdata = await cartModel.findById(item._id);
            console.log(cartdata);

            // if (!cartdata || cartdata.orderComplete) return;

            await cartModel.findByIdAndUpdate(item._id, { orderComplete: true });
        }));

        const options = {
            amount: amount * 100,
            currency: 'INR',
            receipt: newOrder._id.toString()
        }
console.log('first', options)
        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error)
                return res.status(500).json({ message: error })
            }
            res.status(200).json({ order, message: "Order Placed" })

        })

    } catch (error) {
        return res.status(400).json({ message: error })
    }
}

module.exports.verifyRazorPay = async (req, res, next) => {
    try {
        const { razorpay_order_id } = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        console.log(orderInfo)
        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
            res.status(200).json({ orderInfo, message: "Payment Successfull" })
        }
        else {
            res.status(400).json({ message: "Payment Failed" })
        }
    } catch (error) {
        return res.status(400).json({ message: error })
    }

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
        return res.status(400).json({ message: error });
    }



}

//get All Order
module.exports.getAllOrders = async (req, res, next) => {
    try {
        const seller = req.adminUser;
        // console.log('getorder')
        const finalData = [];
        if (!seller) {
            return res.status(401).json({ message: 'Unauthrization' });
        }

        const lstOrders = await orderModel.find();





        if (!lstOrders) {
            return res.status(200).json({
                message: "fetched successfully."
            });
        }

        await Promise.all(lstOrders.map(async (order) => {


            const cartData = []
            await Promise.all(order.items.map(async (cartItem) => {
                const cart = await cartModel.findById(cartItem._id);
                const product = await productModel.findOne({ _id: cart.productId, userId: seller._id });
                // console.log('cart', cart)
                cartData.push({ cart: cart, product: product })
                // finalData.push({cart:cartData, product:productData, order:order});
            }));

            finalData.push({ order: order });
            finalData[finalData.length - 1]['cart'] = cartData
        }));

        //console.log('finalData')
        res.status(200).json({
            orders: finalData,
            message: "Orders fetched successfully."
        });

    } catch (error) {
        return res.status(400).json({ message: error });
    }
}

// Update Status
module.exports.updateStatus = async (req, res, next) => {
    try {
        const { orderId, status } = req.query

        await orderModel.findByIdAndUpdate(orderId, { status: status })
        res.status(200).json({
            orders: true,
            message: "Order status update."
        });
    } catch (error) {
        return res.status(400).json({ message: error });
    }

}