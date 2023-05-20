const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const checkAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authorization.split(' ')[1];
    try {
        const { uname } = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findOne({ uname }).select('uname');
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = checkAuth;