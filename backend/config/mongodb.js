const mongoose = require('mongoose')

const connectDB = async () => {
    await mongoose.connect(`${process.env.MONGOOSE_URL}/e-commerce`)
        .then(() => console.log('Server created'))
        .catch((error) => {
console.error(error);

        })
}


module.exports = connectDB;