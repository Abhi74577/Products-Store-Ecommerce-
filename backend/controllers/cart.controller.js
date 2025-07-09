const cartModel = require('../models/cart.model')
const cartService = require('../services/cart.service')

module.exports.addCart = async (req, res, next) => {
    const { productId, size, sizeTotal } = req.body;
    if (!productId || !size || !sizeTotal) {
        return res.status(400).json({ message: 'Please fill are required field' });
    }


    try {
        const userData = req.user;
        if (!userData) {
            return res.status(401).json({ message: 'Unauthroize' });
        }

        const cart = await cartService.add({
            productId, size, sizeTotal, userId: userData._id, date: Date.now()
        })

        res.status(200).json({ cart, message: 'Item added to cart' })
    } catch (error) {
        return res.status(400).json({ message: error });
    }

}

module.exports.getCartByUser = async (req, res, next) => {
    const userData = req.user;
    if (!userData) {
        return res.status(401).json({ message: 'Unauthroize' });
    }

    try {
        const lstcarts = await cartService.getbyuser(userData._id);
        res.status(200).json({ carts: lstcarts, message: 'cart get successfully' })
    } catch (error) {
        return res.status(400).json({ message: error });
    }

}

module.exports.updateSize = async (req, res, next) => {
   
    const { cartId, buttonType } = req.query;
    if (!cartId || !buttonType) {
        return res.status(400).json({ message: 'cartId and button type are required' });
    }

    try {
        const cart = await cartService.update(cartId, btnNb=Number(buttonType));
        res.status(200).json({ cart, message: 'item quntity is update.' });

    } catch (error) {
        return res.status(400).json({ message: error });
    }
}
module.exports.deleteItem = async (req, res, next) => {
    
    const { cartId } = req.query;
    if (!cartId ) {
        return res.status(400).json({ message: 'cart Id is required' });
    }

    try {
         await cartService.deleteItem(cartId);
        res.status(200).json({ message: 'item remove successfully' });

    } catch (error) {
        return res.status(400).json({ message: error });
    }
}

