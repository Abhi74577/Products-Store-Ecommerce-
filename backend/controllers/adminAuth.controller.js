const adminModel = require('../models/admin.model');
const blackListTokenModel = require('../models/blackLiskToken.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator')


module.exports.adminRegistration = async (req, res, next) => {
    console.log('object')
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All field are required' })
    }

    if (!validator.isEmail(email)) {
       return res.status(400).json({ error: 'Enter valid email address' })
    }

    if (password.length < 8) {
        return res.status(400).json({ message: "Please enter a strong password and password grater than 8" });
    }

    const exitsEmail = await adminModel.findOne({ email })

    if (exitsEmail) {
        return res.status(400).json({ error: 'Email is allready exits' })
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newadminUser = new adminModel({
        name, email, password: hashPassword
    })

    const admin = await newadminUser.save()
console.log(admin)
    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });

    res.status(200).json({token, admin});

}

module.exports.adminLogin = async (req, res, next) => {
    console.log(req.body)
    const { email, password } = req.body;

    const admin = await adminModel.findOne({ email }).select('+password');
console.log(admin)
    if (!admin) {
        return res.status(400).json({ message: "Incorrect your email and password" });
    }

    const isMatchPass = await bcrypt.compare(password, admin.password)
    if (!isMatchPass) {
        return res.status(401).json({ message: "Incorrect your email and password" });
    }

    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });

    res.status(200).json({ token, admin, message: 'Login successfull!' })
}

module.exports.getProfile = async (req, res, next) => {
    res.status(200).json({ profile: req.adminUser })
}

module.exports.Logout = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    await blackListTokenModel.create({ token });

    res.status(200).json({ message: 'LoggedOut successfully' });

}