const cloudinary = require('cloudinary').v2

const productService = require('../services/product.service')


// Add Product
module.exports.addProduct = async (req, res, next) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item != undefined);

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        )
        if (!name || !description || !price || imagesUrl.length == 0 || !category || !subCategory || sizes.length == 0) {
            return res.status(400).json({ message: 'Please fill all required fields.' })

        }

        const userData = req.adminUser;

        const productData = {
            name,
            description,
            price: Number(price),
            image: imagesUrl,
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller == "true" ? true : false,
            date: Date.now(),
            userId: userData._id
        }
        console.log(productData)

        const product = await productService.createProduct(productData)

        res.status(200).json({ message: "Product create successfully." })

    } catch (error) {
        return res.status(400).json({ message: error })
    }

}

// Get All Product
module.exports.listOfProducts = async (req, res, next) => {
    try {
        const userData = req.adminUser;
        const products = await productService.getProduct(userData._id)
        // console.log(product)
        res.status(200).json({ products, message: 'Products get successfully.' })
    } catch (error) {
        return res.status(400).json({ message: error })
    }

}

// Get Product By Id
module.exports.getProductById = async (req, res, next) => {
    console.log(req.query)
    try {
        const { productId } = req.query;
        if (!productId) {
            return res.status(400).json({ message: 'Please pass productId in params.' })
        }

        const product = await productService.getProductById(productId)
        res.status(200).json({ product, message: 'Product get successfully' })
    } catch (error) {
        return res.status(400).json({ message: error })
    }


}

// Remove Product
module.exports.removeProduct = async (req, res, next) => {
    try {
        console.log(req.query);
        
        const { productId } = req.query
        if (!productId) {
            return res.status(400).json({ message: 'Please pass productId in params.' })
        }

        const data = await productService.removeProduct(productId)
        console.log(data)
        res.status(200).json({ data: true, message: 'Product delete successfully' })

    } catch (error) {
        return res.status(400).json({ message: error })
    }
}

// Update Product
module.exports.updateProduct = async (req, res, next) => {
    
}

// Get All products by all sellers 
// Get All Product
module.exports.getProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProducts()
        // console.log(product)
        res.status(200).json({ products, message: 'Products get successfully.' })
    } catch (error) {
        return res.status(400).json({ message: error })
    }

}