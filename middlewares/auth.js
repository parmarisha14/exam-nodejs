const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    
    if (!token) return res.redirect('/login');

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) return res.redirect('/login');
         req.user = decodedToken;
        next();
    });
};

module.exports.checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    
    if (!token) {
        res.locals.user = null;
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.id).exec();
        res.locals.user = user;
        next();
    } catch (err) {
        res.locals.user = null;
        next();
    }
};