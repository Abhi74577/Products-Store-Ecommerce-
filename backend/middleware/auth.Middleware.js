const userModel = require('../models/user.model')
const blackListTokenModel = require('../models/blackLiskToken.model')
const adminModel = require('../models/admin.model')
const jwt = require('jsonwebtoken')
module.exports.getUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const checkblackToken = await blackListTokenModel.findOne({ token })

    if (checkblackToken != null) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await userModel.findById(decoded._id)

        req.user = user;

        return next();

    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}


module.exports.getAdmin = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token)
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const checkBlackList = await blackListTokenModel.findOne({ token });
    if (checkBlackList) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const admin = await adminModel.findById(decoded._id);

        req.adminUser = admin

        return next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}