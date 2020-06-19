const jwt = require ('jsonwebtoken');
const config = require('config');
const { request } = require('express');

module.exports = function (req, res, next) {
    // Get token from header 
    const token = req.header('x-auth-token');

    // Check if not token 
    if(!token) {
        return res.status(401).json({msg:'No token, authorisation denied!'});
    }

    try {
        const decoded = jsw.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({'Token is not valid!'});
    }
}