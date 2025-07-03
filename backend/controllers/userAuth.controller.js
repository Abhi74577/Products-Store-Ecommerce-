const userModel = require('../models/user.model')
const blackListTokenModel = require('../models/blackLiskToken.model')
const userService = require('../services/userAuth.service')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const passwordHashed = async (password) => {
    return await bcrypt.hash(password, 10);
}

const gernateToken = async (id) => {
    const token = jwt.sign({ _id: id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
    return token;
}

// Registration

module.exports.userRegistration = async (req, res, next) => {
    console.log(req.body)
    const { name, email, password } = req.body;
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Please enter valid email" });
    }
    console.log(password.length)
    if (password.length < 8) {
        return res.status(400).json({ message: "Please enter a strong password and password grater than 8" });
    }

    const exitEmail = await userModel.findOne({ email });
    if (exitEmail) {
        return res.status(400).json({ message: `This ${email} is already exits Please use another email` });
    }

    const hashPassword = await passwordHashed(password);

    const user = await userService.createUser({ name, email, password: hashPassword });

    const token = await gernateToken(user._id);

    res.status(200).json({ token, user })

}

// Login
module.exports.useerLogin = async (req, res, next) => {
    console.log(req.body)
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');

    if(!user){
        return res.status(400).json({ message: "Incorrect your email and password" });
    }

    const isMatchPass = bcrypt.compare(password, user.password)
    if (!isMatchPass) {
        return res.status(401).json({ message: "Password is not correct" });
    }

    const token = await gernateToken(user._id);

    res.status(200).json({token, user, message: 'Login successfull!'})
}

//User Profile

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json({ user: req.user})
}

// Logout

module.exports.Logout = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    await blackListTokenModel.create({ token });

    res.status(200).json({ message: 'LoggedOut successfully' });

}



