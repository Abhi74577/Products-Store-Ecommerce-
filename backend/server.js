const dotenv = require('dotenv');
dotenv.config();
const express  = require('express')
const cors = require('cors')
const connectDB = require('./config/mongodb')
const connectCloudinary = require('./config/cloudinary')
const userRouter = require('./routes/userAuth.routes')
const adminRouter = require('./routes/adminAuth.routes')
const productRouter = require('./routes/product.routes')
const cartRouter = require('./routes/cart.routes')
//App Configuration
const app = express();
const port = process.env.PORT || 4000
// db call
connectDB()
connectCloudinary()

// middleware
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true })); // for application/x-www-form-urlencoded

// roter endpoints apis

app.use('/api/users', userRouter);
app.use('/api/admins', adminRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

// api endpoints
app.get('/', (req,res) => {
    res.send("Api Working")
})

app.listen(port, () => console.log('server started on port :' + port));