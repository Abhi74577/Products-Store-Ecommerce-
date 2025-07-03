const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
     name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true,
        select: false
    },
    earning:{
        type: Number,
        default : 0
    }
})

const adminModel = mongoose.model('admin', adminSchema);

module.exports = adminModel;

